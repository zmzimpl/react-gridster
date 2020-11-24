import * as React from 'react'
import styles from './styles.module.css'
import { GridsterConfig } from './gridsterConfig.interface';
import { GridsterConfigS } from './gridsterConfigS.interface';
import { GridsterRenderer } from './gridsterRenderer';
import { GridsterItem } from './gridsterItem.interface';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
import { Renderer } from './utils/renderer';


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
  // emptyCell: GridsterEmptyCell;
  // compact: GridsterCompact;
  gridRenderer: GridsterRenderer = new GridsterRenderer(this);

  renderer: Renderer = new Renderer();

  constructor(props: Props) {
    super(props);
    this.curWidth = 0;
    this.curHeight = 0;
    this.curColWidth = 0;
    this.curRowHeight = 0;
  }

  componentDidMount() {
    this.setGridSize();
    this.calculateLayout();
    this.updateGrid();
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

  }

  optionsChanged(): void {
    this.setOptions();

  }

  calculateLayout() {
    let marginWidth = -this.$options?.margin || 0;
    this.curColWidth = (this.curWidth - marginWidth) / this.columns;
    let marginHeight = -this.$options?.margin || 0;
    this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
  }

  updateGrid(): void {

  }

  render() {
    const gridsterColumns = [];
    for(let i = 0; i < this.columns; i++) {
      const style = this.gridRenderer.getGridColumnStyle(i);
      gridsterColumns.push(
        <div key={'grid-col-' + i} className={styles.gridsterColumn} style={style}></div>
      )
    }
    const gridsterRows = [];
    for(let i = 0; i < this.rows; i++) {
      const style = this.gridRenderer.getGridRowStyle(i);
      gridsterRows.push(
        <div key={'grid-row-' + i} className={styles.gridsterRow} style={style}></div>
      )
    }
    console.log(gridsterColumns);
    console.log(gridsterRows);
    return (
      <div className={styles.gridster + ' ' + styles.displayGrid} id="gridster-board">
        { gridsterColumns }
        { gridsterRows }
      </div>
    )
  }
}

// export const Gridster = ({ options }: Props) => {
//   return <div className={styles.test}>
    
//   </div>
// }
