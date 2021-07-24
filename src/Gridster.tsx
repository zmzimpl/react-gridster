import * as React from 'react';
import { GridsterComponentInterface } from './gridster.interface';
import { GridsterCompact } from './gridsterCompact.service';
import { GridsterConfigService } from './gridsterConfig.constant';
import { GridsterConfig, GridType } from './gridsterConfig.interface';
import { GridsterConfigS } from './gridsterConfigS.interface';
import { GridsterEmptyCell } from './gridsterEmptyCell.service';
import { GridsterItem, GridsterItemComponentInterface } from './gridsterItem.interface';
import { GridsterRenderer } from './gridsterRenderer';
import { GridsterUtils } from './gridsterUtils.service';
import styles from './styles.module.css';
import { Renderer } from './utils/renderer';

interface Props {
  options: GridsterConfig;
}

export class ReactGridster extends React.Component<Props> implements GridsterComponentInterface {

  calculateLayoutDebounce: () => void;

  $options: GridsterConfigS;
  options!: GridsterConfig;
  columns = 0;
  rows = 0;
  gridRows: number[] = [];
  gridColumns: number[] = [];
  curWidth!: number;
  curHeight!: number;
  curRowHeight!: number;
  renderer: Renderer = new Renderer();
  curColWidth!: number;
  el: HTMLDivElement;
  compact!: GridsterCompact;
  emptyCell: GridsterEmptyCell;
  gridRenderer: GridsterRenderer;
  mobile: boolean = false;
  grid: GridsterItemComponentInterface[] = [];
  dragInProgress: boolean = false;
  windowResize!: (() => void) | null;

  elRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.elRef = React.createRef<HTMLDivElement>();
    this.el = this.elRef.current as HTMLDivElement;
    this.$options = JSON.parse(JSON.stringify(GridsterConfigService));
    this.calculateLayoutDebounce = GridsterUtils.debounce(this.calculateLayout.bind(this), 0);
    this.mobile = false;
    this.curWidth = 0;
    this.curHeight = 0;
    this.grid = [];
    this.curColWidth = 0;
    this.curRowHeight = 0;
    this.dragInProgress = false;
    this.emptyCell = new GridsterEmptyCell(this);
    this.compact = new GridsterCompact(this);
    this.gridRenderer = new GridsterRenderer(this);
    if (this.props.options) {
      this.options = this.props.options;
      this.setOptions();
    }
  }
  
  componentDidMount() {
    this.el = this.elRef.current as HTMLDivElement;
    console.log(this.el);
  }

  setOptions(): void {
    this.$options = GridsterUtils.merge(this.$options, this.options, this.$options);
    if (!this.$options.disableWindowResize && !this.windowResize) {
      this.windowResize = this.renderer.listen('window', 'resize', this.onResize.bind(this));
    } else if (this.$options.disableWindowResize && this.windowResize) {
      this.windowResize();
      this.windowResize = null;
    }
    this.emptyCell.updateOptions();
  }

  calculateLayout(): void {
    if (this.compact) {
      this.compact.checkCompact();
    }

    this.setGridDimensions();
    if (this.$options.outerMargin) {
      let marginWidth = -this.$options.margin;
      if (this.$options.outerMarginLeft !== null) {
        marginWidth += this.$options.outerMarginLeft;
        this.renderer.setStyle(this.el, 'padding-left', this.$options.outerMarginLeft + 'px');
      } else {
        marginWidth += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-left', this.$options.margin + 'px');
      }
      if (this.$options.outerMarginRight !== null) {
        marginWidth += this.$options.outerMarginRight;
        this.renderer.setStyle(this.el, 'padding-right', this.$options.outerMarginRight + 'px');
      } else {
        marginWidth += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-right', this.$options.margin + 'px');
      }
      this.curColWidth = (this.curWidth - marginWidth) / this.columns;
      let marginHeight = -this.$options.margin;
      if (this.$options.outerMarginTop !== null) {
        marginHeight += this.$options.outerMarginTop;
        this.renderer.setStyle(this.el, 'padding-top', this.$options.outerMarginTop + 'px');
      } else {
        marginHeight += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-top', this.$options.margin + 'px');
      }
      if (this.$options.outerMarginBottom !== null) {
        marginHeight += this.$options.outerMarginBottom;
        this.renderer.setStyle(this.el, 'padding-bottom', this.$options.outerMarginBottom + 'px');
      } else {
        marginHeight += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-bottom', this.$options.margin + 'px');
      }
      this.curRowHeight = ((this.curHeight - marginHeight) / this.rows) * this.$options.rowHeightRatio;
    } else {
      this.curColWidth = (this.curWidth + this.$options.margin) / this.columns;
      this.curRowHeight = ((this.curHeight + this.$options.margin) / this.rows) * this.$options.rowHeightRatio;
      this.renderer.setStyle(this.el, 'padding-left', 0 + 'px');
      this.renderer.setStyle(this.el, 'padding-right', 0 + 'px');
      this.renderer.setStyle(this.el, 'padding-top', 0 + 'px');
      this.renderer.setStyle(this.el, 'padding-bottom', 0 + 'px');
    }
    this.gridRenderer.updateGridster();

    if (this.$options.setGridSize) {
      this.renderer.addClass(this.el, 'gridSize');
      if (!this.mobile) {
        this.renderer.setStyle(this.el, 'width', (this.columns * this.curColWidth + this.$options.margin) + 'px');
        this.renderer.setStyle(this.el, 'height', (this.rows * this.curRowHeight + this.$options.margin) + 'px');
      }
    } else {
      this.renderer.removeClass(this.el, 'gridSize');
      this.renderer.setStyle(this.el, 'width', '');
      this.renderer.setStyle(this.el, 'height', '');
    }
    this.updateGrid();

    let widgetsIndex: number = this.grid.length - 1;
    let widget: GridsterItemComponentInterface;
    for (; widgetsIndex >= 0; widgetsIndex--) {
      widget = this.grid[widgetsIndex];
      widget.setSize();
      widget.drag.toggle();
      widget.resize.toggle();
    }

    setTimeout(this.resize.bind(this), 100);
  }

  resize(): void {
    let height;
    let width;
    if (this.$options.gridType === 'fit' && !this.mobile) {
      width = this.el.offsetWidth;
      height = this.el.offsetHeight;
    } else {
      width = this.el.clientWidth;
      height = this.el.clientHeight;
    }
    if ((width !== this.curWidth || height !== this.curHeight) && this.checkIfToResize()) {
      this.onResize();
    }
  }

  onResize(): void {
    if (this.el.clientWidth) {
      if (this.options.setGridSize) { // reset width/height so the size is recalculated afterwards
        this.renderer.setStyle(this.el, 'width', '');
        this.renderer.setStyle(this.el, 'height', '');
      }
      this.setGridSize();
      this.calculateLayout();
    }
  }

  setGridSize(): void {
    const el = this.el;
    let width;
    let height;
    if (this.$options.setGridSize || this.$options.gridType === GridType.Fit && !this.mobile) {
      width = el.offsetWidth;
      height = el.offsetHeight;
    } else {
      width = el.clientWidth;
      height = el.clientHeight;
    }
    this.curWidth = width;
    this.curHeight = height;
  }

  checkIfToResize(): boolean {
    const clientWidth = this.el.clientWidth;
    const offsetWidth = this.el.offsetWidth;
    const scrollWidth = this.el.scrollWidth;
    const clientHeight = this.el.clientHeight;
    const offsetHeight = this.el.offsetHeight;
    const scrollHeight = this.el.scrollHeight;
    const verticalScrollPresent = clientWidth < offsetWidth && scrollHeight > offsetHeight
      && scrollHeight - offsetHeight < offsetWidth - clientWidth;
    const horizontalScrollPresent = clientHeight < offsetHeight
      && scrollWidth > offsetWidth && scrollWidth - offsetWidth < offsetHeight - clientHeight;
    if (verticalScrollPresent) {
      return false;
    }
    return !horizontalScrollPresent;
  }

  updateGrid(): void {
    if (this.$options.displayGrid === 'always' && !this.mobile) {
      this.renderer.addClass(this.el, 'display-grid');
    } else if (this.$options.displayGrid === 'onDrag&Resize' && this.dragInProgress) {
      this.renderer.addClass(this.el, 'display-grid');
    } else if (this.$options.displayGrid === 'none' || !this.dragInProgress || this.mobile) {
      this.renderer.removeClass(this.el, 'display-grid');
    }
    this.setGridDimensions();
    this.gridColumns.length = ReactGridster.getNewArrayLength(this.columns, this.curWidth, this.curColWidth);
    this.gridRows.length = ReactGridster.getNewArrayLength(this.rows, this.curHeight, this.curRowHeight);
  }

  static getNewArrayLength(length: number, overallSize: number, size: number): number {
    const newLength = Math.max(length, Math.floor(overallSize / size));

    if (newLength < 0) {
      return 0;
    }

    if (Number.isFinite(newLength)) {
      return Math.floor(newLength);
    }

    return 0;
  }

  checkCollision(item: GridsterItem): GridsterItemComponentInterface | boolean {
    let collision: GridsterItemComponentInterface | boolean = false;
    if (this.options.itemValidateCallback) {
      collision = !this.options.itemValidateCallback(item);
    }
    if (!collision && this.checkGridCollision(item)) {
      collision = true;
    }
    if (!collision) {
      const c = this.findItemWithItem(item);
      if (c) {
        collision = c;
      }
    }
    return collision;
  }

  checkGridCollision(item: GridsterItem): boolean {
    const noNegativePosition = item.y > -1 && item.x > -1;
    const maxGridCols = item.cols + item.x <= this.$options.maxCols;
    const maxGridRows = item.rows + item.y <= this.$options.maxRows;
    const maxItemCols = item.maxItemCols === undefined ? this.$options.maxItemCols : item.maxItemCols;
    const minItemCols = item.minItemCols === undefined ? this.$options.minItemCols : item.minItemCols;
    const maxItemRows = item.maxItemRows === undefined ? this.$options.maxItemRows : item.maxItemRows;
    const minItemRows = item.minItemRows === undefined ? this.$options.minItemRows : item.minItemRows;
    const inColsLimits = item.cols <= maxItemCols && item.cols >= minItemCols;
    const inRowsLimits = item.rows <= maxItemRows && item.rows >= minItemRows;
    const minAreaLimit = item.minItemArea === undefined ? this.$options.minItemArea : item.minItemArea;
    const maxAreaLimit = item.maxItemArea === undefined ? this.$options.maxItemArea : item.maxItemArea;
    const area = item.cols * item.rows;
    const inMinArea = minAreaLimit <= area;
    const inMaxArea = maxAreaLimit >= area;
    return !(noNegativePosition && maxGridCols && maxGridRows && inColsLimits && inRowsLimits && inMinArea && inMaxArea);
  }

  findItemWithItem(item: GridsterItem): GridsterItemComponentInterface | boolean {
    let widgetsIndex = 0;
    let widget: GridsterItemComponentInterface;
    for (; widgetsIndex < this.grid.length; widgetsIndex++) {
      widget = this.grid[widgetsIndex];
      if (widget.$item !== item && this.checkCollisionTwoItems(widget.$item, item)) {
        return widget;
      }
    }
    return false;
  }

  findItemsWithItem(item: GridsterItem): Array<GridsterItemComponentInterface> {
    const a: Array<GridsterItemComponentInterface> = [];
    let widgetsIndex = 0;
    let widget: GridsterItemComponentInterface;
    for (; widgetsIndex < this.grid.length; widgetsIndex++) {
      widget = this.grid[widgetsIndex];
      if (widget.$item !== item && this.checkCollisionTwoItems(widget.$item, item)) {
        a.push(widget);
      }
    }
    return a;
  }

  checkCollisionTwoItems(item: GridsterItem, item2: GridsterItem): boolean {
    const collision = item.x < item2.x + item2.cols
      && item.x + item.cols > item2.x
      && item.y < item2.y + item2.rows
      && item.y + item.rows > item2.y;
    if (!collision) {
      return false;
    }
    if (!this.$options.allowMultiLayer) {
      return true;
    }
    const defaultLayerIndex = this.$options.defaultLayerIndex;
    const layerIndex = item.layerIndex === undefined ? defaultLayerIndex : item.layerIndex;
    const layerIndex2 = item2.layerIndex === undefined ? defaultLayerIndex : item2.layerIndex;
    return layerIndex === layerIndex2;
  }



  setGridDimensions(): void {
    this.setGridSize();
    if (!this.mobile && this.$options.mobileBreakpoint > this.curWidth) {
      this.mobile = !this.mobile;
      this.renderer.addClass(this.el, 'mobile');
    } else if (this.mobile && this.$options.mobileBreakpoint < this.curWidth) {
      this.mobile = !this.mobile;
      this.renderer.removeClass(this.el, 'mobile');
    }
    let rows = this.$options.minRows;
    let columns = this.$options.minCols;

    let widgetsIndex = this.grid.length - 1;
    let widget;
    for (; widgetsIndex >= 0; widgetsIndex--) {
      widget = this.grid[widgetsIndex];
      if (!widget.notPlaced) {
        rows = Math.max(rows, widget.$item.y + widget.$item.rows);
        columns = Math.max(columns, widget.$item.x + widget.$item.cols);
      }
    }

    if (this.columns !== columns || this.rows !== rows) {
      this.columns = columns;
      this.rows = rows;
      if (this.options.gridSizeChangedCallback) {
        this.options.gridSizeChangedCallback(this);
      }
    }
  }

   // ------ Functions for swapWhileDragging option

  // identical to checkCollision() except that this function calls findItemWithItemForSwaping() instead of findItemWithItem()
  checkCollisionForSwaping(item: GridsterItem): GridsterItemComponentInterface | boolean {
    let collision: GridsterItemComponentInterface | boolean = false;
    if (this.options.itemValidateCallback) {
      collision = !this.options.itemValidateCallback(item);
    }
    if (!collision && this.checkGridCollision(item)) {
      collision = true;
    }
    if (!collision) {
      const c = this.findItemWithItemForSwapping(item);
      if (c) {
        collision = c;
      }
    }
    return collision;
  }

  // identical to findItemWithItem() except that this function calls checkCollisionTwoItemsForSwaping() instead of checkCollisionTwoItems()
  findItemWithItemForSwapping(item: GridsterItem): GridsterItemComponentInterface | boolean {
    let widgetsIndex: number = this.grid.length - 1;
    let widget: GridsterItemComponentInterface;
    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];
      if (widget.$item !== item && ReactGridster.checkCollisionTwoItemsForSwaping(widget.$item, item)) {
        return widget;
      }
    }
    return false;
  }

  render() {
    const gridsterColumns = [];
    const gridsterRows = [];
    console.log(this.columns);
    console.log(this.rows);
    for(let i = 0; i < this.columns; i++) {
      const style = this.gridRenderer.getGridColumnStyle(i);
      gridsterColumns.push(
        <div key={'grid-col-' + i} className={styles.gridsterColumn} style={style}></div>
      )
    }
    for(let i = 0; i < this.rows; i++) {
      const style = this.gridRenderer.getGridRowStyle(i);
      gridsterRows.push(
        <div key={'grid-row-' + i} className={styles.gridsterRow} style={style}></div>
      )
    }
    console.log(gridsterColumns);
    console.log(gridsterRows);
    return (
      <div className={styles.gridster + ' ' + styles.displayGrid + ' ' + styles[this.$options?.gridType]} ref={this.elRef as React.RefObject<HTMLDivElement>}>
        { ...gridsterColumns }
        { ...gridsterRows }
        {this.props.children}
      </div>
    )
  }

    // identical to checkCollision() except that here we add boundaries.
    static checkCollisionTwoItemsForSwaping(item: GridsterItem, item2: GridsterItem): boolean {
      // if the cols or rows of the items are 1 , doesnt make any sense to set a boundary. Only if the item is bigger we set a boundary
      const horizontalBoundaryItem1 = item.cols === 1 ? 0 : 1;
      const horizontalBoundaryItem2 = item2.cols === 1 ? 0 : 1;
      const verticalBoundaryItem1 = item.rows === 1 ? 0 : 1;
      const verticalBoundaryItem2 = item2.rows === 1 ? 0 : 1;
      return item.x + horizontalBoundaryItem1 < item2.x + item2.cols
        && item.x + item.cols > item2.x + horizontalBoundaryItem2
        && item.y + verticalBoundaryItem1 < item2.y + item2.rows
        && item.y + item.rows > item2.y + verticalBoundaryItem2;
    }
  
}
