import * as React from 'react'
import { GridsterConfig } from './GridsterConfig.interface';
import { GridsterConfigS } from './GridsterConfigS.interface';
import { GridsterRenderer } from './GridsterRenderer';
import { GridsterItemInterface } from './GridsterItem.interface';
import { GridsterItemComponentInterface } from './GridsterItemComponent.interface';
import { Renderer } from './utils/renderer';
import { GridsterConfigService } from './GridsterConfig.constant';
import { GridsterEmptyCell } from './GridsterEmptyCell';
import { GridsterCompact } from './GridsterCompact';
import { GridsterUtils } from './GridsterUtils.service';
import debounce from 'lodash/debounce';
import styles from './styles.module.css'

interface Props {
  options: GridsterConfig;
}

export class Gridster extends React.Component<Props> {
  calculateLayoutDebounce: () => void;
  movingItem: GridsterItemInterface | null;
  previewStyle: () => void;
  el: any;
  $options: GridsterConfigS;
  options: GridsterConfig;
  mobile: boolean;
  curWidth: number;
  curHeight: number;
  grid: Array<GridsterItemComponentInterface>;
  columns = 12;
  rows = 12;
  curColWidth: number;
  curRowHeight: number;
  gridColumns = [];
  gridRows = [];
  windowResize: (() => void) | null;
  dragInProgress: boolean;
  emptyCell: GridsterEmptyCell;
  compact: GridsterCompact;
  gridRenderer: GridsterRenderer = new GridsterRenderer(this);

  renderer: Renderer = new Renderer();

  state = {
    columns: 12,
    rows: 12,
    curWidth: 0,
    curHeight: 0,
    curColWidth: 0,
    curRowHeight: 0,
  }

  constructor(props: Props) {
    super(props);
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
    console.log(props);
    if (this.props.options) {
      this.options = this.props.options;
      this.setOptions();
      this.columns = this.$options.minCols;
      this.rows = this.$options.minRows;
    }
  }


  componentDidUpdate() {
    this.columns = this.$options.minCols;
    this.rows = this.$options.minRows;
    this.setOptions();
    // this.setGridSize();
    // this.calculateLayout();
  }

  componentDidMount() {
    this.el = document.getElementById('gridster-board') as HTMLDivElement;
    this.setOptions();
    this.setGridSize();
    this.calculateLayout();
    this.updateGrid();
    this.forceUpdate();
  }

  static checkCollisionTwoItems(item: GridsterItemInterface, item2: GridsterItemInterface): boolean {
    return item.x < item2.x + item2.cols
      && item.x + item.cols > item2.x
      && item.y < item2.y + item2.rows
      && item.y + item.rows > item2.y;
  }

  findItemWithItem(item: GridsterItemInterface): GridsterItemComponentInterface | boolean {
    let widgetsIndex: number = this.grid.length - 1, widget: GridsterItemComponentInterface;
    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];
      if (widget.$item !== item && Gridster.checkCollisionTwoItems(widget.$item, item)) {
        return widget;
      }
    }
    return false;
  }

  findItemsWithItem(item: GridsterItemInterface): Array<GridsterItemComponentInterface> {
    const a: Array<GridsterItemComponentInterface> = [];
    let widgetsIndex: number = this.grid.length - 1, widget: GridsterItemComponentInterface;
    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];
      if (widget.$item !== item && Gridster.checkCollisionTwoItems(widget.$item, item)) {
        a.push(widget);
      }
    }
    return a;
  }

  checkCollision(item: GridsterItemInterface): GridsterItemComponentInterface | boolean { 
    console.log(item);
    return false;
  }

  checkGridCollision(item: GridsterItemInterface): boolean { 
    console.log(item);
    return false;
  }
  // identical to checkCollision() except that this function calls findItemWithItemForSwaping() instead of findItemWithItem()
  checkCollisionForSwaping(item: GridsterItemInterface): GridsterItemComponentInterface | boolean { 
    console.log(item);
    return false;
  }

  pixelsToPositionX(x: number, roundingMethod: Function, noLimit?: boolean): number {
    const position = roundingMethod(x / this.curColWidth);
    if (noLimit) {
      return position;
    } else {
      return Math.max(position, 0);
    }
  }

  pixelsToPositionY(y: number, roundingMethod: Function, noLimit?: boolean): number {
    const position = roundingMethod(y / this.curRowHeight);
    if (noLimit) {
      return position;
    } else {
      return Math.max(position, 0);
    }
  }


  positionXToPixels(x: number): number {
    return x * this.curColWidth;
  }

  positionYToPixels(y: number): number {
    return y * this.curRowHeight;
  }

  addItem(itemComponent: GridsterItemComponentInterface): void {
    console.log('add', itemComponent);
    if (itemComponent.$item.cols === undefined) {
      itemComponent.$item.cols = this.$options.defaultItemCols;
      itemComponent.item.cols = itemComponent.$item.cols;
      itemComponent.itemChanged();
    }
    if (itemComponent.$item.rows === undefined) {
      itemComponent.$item.rows = this.$options.defaultItemRows;
      itemComponent.item.rows = itemComponent.$item.rows;
      itemComponent.itemChanged();
    }
    if (itemComponent.$item.x === -1 || itemComponent.$item.y === -1) {
      this.autoPositionItem(itemComponent);
    } else if (this.checkCollision(itemComponent.$item)) {
      if (!this.$options.disableWarnings) {
        itemComponent.notPlaced = true;
        console.warn('Can\'t be placed in the bounds of the dashboard, trying to auto position!/n' +
          JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
      }
      if (!this.$options.disableAutoPositionOnConflict) {
        this.autoPositionItem(itemComponent);
      } else {
        itemComponent.notPlaced = true;
      }
    }
    this.grid.push(itemComponent);
    this.calculateLayoutDebounce();
  }

  removeItem(itemComponent: GridsterItemComponentInterface): void {
    console.log(itemComponent);
  }

  setGridDimensions(): void {

  }

  autoPositionItem(itemComponent: GridsterItemComponentInterface): void {
    if (this.getNextPossiblePosition(itemComponent.$item)) {
      itemComponent.notPlaced = false;
      itemComponent.item.x = itemComponent.$item.x;
      itemComponent.item.y = itemComponent.$item.y;
      itemComponent.itemChanged();
    } else {
      itemComponent.notPlaced = true;
      if (!this.$options.disableWarnings) {
        console.warn('Can\'t be placed in the bounds of the dashboard!/n' +
          JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
      }
    }
  }

  getNextPossiblePosition(newItem: GridsterItemInterface, startingFrom: { y?: number, x?: number } = {}): boolean {
    if (newItem.cols === -1) {
      newItem.cols = this.$options.defaultItemCols;
    }
    if (newItem.rows === -1) {
      newItem.rows = this.$options.defaultItemRows;
    }
    this.setGridDimensions();
    let rowsIndex = startingFrom.y || 0;
    let colsIndex;
    for (; rowsIndex < this.rows; rowsIndex++) {
      newItem.y = rowsIndex;
      colsIndex = startingFrom.x || 0;
      for (; colsIndex < this.columns; colsIndex++) {
        newItem.x = colsIndex;
        if (!this.checkCollision(newItem)) {
          return true;
        }
      }
    }
    const canAddToRows = this.$options.maxRows >= this.rows + newItem.rows;
    const canAddToColumns = this.$options.maxCols >= this.columns + newItem.cols;
    const addToRows = this.rows <= this.columns && canAddToRows;
    if (!addToRows && canAddToColumns) {
      newItem.x = this.columns;
      newItem.y = 0;
      return true;
    } else if (canAddToRows) {
      newItem.y = this.rows;
      newItem.x = 0;
      return true;
    }
    return false;
  }


  /**
   * 设置画布整体大小
   */
  setGridSize(): void {
    const el: HTMLDivElement = document.getElementById('gridster-board') as HTMLDivElement;
    let width = el.clientWidth;
    let height = el.clientHeight;
    console.log(width, 'w');
    console.log(height, 'h');
    if (this.$options?.setGridSize || this.$options?.gridType === 'fit' && !this.mobile) {
      width = el.offsetWidth;
      height = el.offsetHeight;
    } else {
      width = el.clientWidth;
      height = el.clientHeight;
    }
    this.curWidth = width;
    this.curHeight = height;
    console.log(width, 'w');
    console.log(height, 'h');
    this.setState({
      curWidth: this.curWidth,
      curHeight: this.curHeight
    });
  }

  setOptions(): void {
    this.$options = GridsterUtils.merge(this.$options, this.options, this.$options);
    console.log(this.options);
    if (!this.$options.disableWindowResize && !this.windowResize) {
      this.windowResize = this.renderer.listen('window', 'resize', debounce(this.onResize.bind(this), 200));
    } else if (this.$options.disableWindowResize && this.windowResize) {
      this.windowResize();
      this.windowResize = null;
    }
    this.emptyCell.updateOptions();
  }

  optionsChanged(): void {
    this.setOptions();
  }

  calculateLayout() {
    let marginWidth = -this.$options?.margin || 0;
    this.curColWidth = (this.curWidth - marginWidth) / this.columns;
    let marginHeight = -this.$options?.margin || 0;
    this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
    this.setState({
      curColWidth: this.curColWidth,
      curRowHeight: this.curRowHeight
    });
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
    this.gridColumns.length = Math.max(this.columns, Math.floor(this.curWidth / this.curColWidth)) || 0;
    this.gridRows.length = Math.max(this.rows, Math.floor(this.curHeight / this.curRowHeight)) || 0;
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

  onResize(): void {
    this.setGridSize();
    this.calculateLayout();
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

  render() {

    const gridsterColumns = [];
    const gridsterRows = [];
    if (this.el) {
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
    }
    return (
      <div className={styles.gridster + ' ' + styles.displayGrid + ' ' + styles[this.$options?.gridType]} id="gridster-board">
        { ...gridsterColumns }
        { ...gridsterRows }
        {this.props.children}
      </div>
    )
  }
}

// export const Gridster = ({ options }: Props) => {
//   return <div className={styles.test}>
    
//   </div>
// }
