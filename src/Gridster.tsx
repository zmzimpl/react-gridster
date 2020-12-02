import * as React from 'react'
import styles from './styles.module.css'
import { GridsterConfig } from './gridsterConfig.interface';
import { GridsterConfigS } from './gridsterConfigS.interface';
import { GridsterRenderer } from './gridsterRenderer';
import { GridsterItem } from './gridsterItem.interface';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
import { Renderer } from './utils/renderer';
import { GridsterConfigService } from './gridsterConfig.constant';
import { GridsterEmptyCell } from './gridsterEmptyCell';
import { GridsterCompact } from './gridsterCompact';
import { GridsterUtils } from './gridsterUtils.service';


interface Props {
  options: GridsterConfig;
}

export class Gridster extends React.Component<Props> {
  calculateLayoutDebounce: () => void;
  movingItem: GridsterItem | null;
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
  }


  componentDidUpdate() {
    this.columns = this.$options.minCols;
    this.rows = this.$options.minRows;
    this.setOptions();
    this.setGridSize();
    this.calculateLayout();
  }

  componentDidMount() {
    this.el = document.getElementById('gridster-board') as HTMLDivElement;
    this.setOptions();
    this.setGridSize();
    this.calculateLayout();
    this.updateGrid();
    this.forceUpdate();
  }

  static checkCollisionTwoItems(item: GridsterItem, item2: GridsterItem): boolean {
    return item.x < item2.x + item2.cols
      && item.x + item.cols > item2.x
      && item.y < item2.y + item2.rows
      && item.y + item.rows > item2.y;
  }

  findItemWithItem(item: GridsterItem): GridsterItemComponentInterface | boolean {
    let widgetsIndex: number = this.grid.length - 1, widget: GridsterItemComponentInterface;
    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];
      if (widget.$item !== item && Gridster.checkCollisionTwoItems(widget.$item, item)) {
        return widget;
      }
    }
    return false;
  }

  findItemsWithItem(item: GridsterItem): Array<GridsterItemComponentInterface> {
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

  checkCollision(item: GridsterItem): GridsterItemComponentInterface | boolean { 
    console.log(item);
    return false;
  }

  checkGridCollision(item: GridsterItem): boolean { 
    console.log(item);
    return false;
  }
  // identical to checkCollision() except that this function calls findItemWithItemForSwaping() instead of findItemWithItem()
  checkCollisionForSwaping(item: GridsterItem): GridsterItemComponentInterface | boolean { 
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
    console.log(itemComponent);
  }

  removeItem(itemComponent: GridsterItemComponentInterface): void {
    console.log(itemComponent);
  }

  setGridDimensions(): void {

  }


  /**
   * 设置画布整体大小
   */
  setGridSize(): void {
    const el: HTMLDivElement = document.getElementById('gridster-board') as HTMLDivElement;
    let width = el.clientWidth;
    let height = el.clientHeight;
    if (this.$options?.setGridSize || this.$options?.gridType === 'fit' && !this.mobile) {
      width = el.offsetWidth;
      height = el.offsetHeight;
    } else {
      width = el.clientWidth;
      height = el.clientHeight;
    }
    this.curWidth = width;
    this.curHeight = height;
  }

  setOptions(): void {
    this.$options = GridsterUtils.merge(this.$options, this.options, this.$options);
    if (!this.$options.disableWindowResize && !this.windowResize) {
      // TODO 这里需要完善事件监听
      this.windowResize = this.renderer.listen('window', 'resize', this.onResize.bind(this));
      this.windowResize();
    } else if (this.$options.disableWindowResize && this.windowResize) {
      this.windowResize();
      this.windowResize = null;
    }
    this.emptyCell.updateOptions();
  }

  optionsChanged(): void {
    this.setOptions();
    this.forceUpdate();
  }

  calculateLayout() {
    let marginWidth = -this.$options?.margin || 0;
    this.curColWidth = (this.curWidth - marginWidth) / this.columns;
    let marginHeight = -this.$options?.margin || 0;
    this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
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
        console.log(style);
        gridsterRows.push(
          <div key={'grid-row-' + i} className={styles.gridsterRow} style={style}></div>
        )
      }
    }
    console.log(gridsterColumns);
    console.log(gridsterRows);
    return (
      <div className={styles.gridster + ' ' + styles.displayGrid} id="gridster-board">
        { ...gridsterColumns }
        { ...gridsterRows }
      </div>
    )
  }
}

// export const Gridster = ({ options }: Props) => {
//   return <div className={styles.test}>
    
//   </div>
// }
