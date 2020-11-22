import * as React from 'react'
import styles from './styles.module.css'
import { GridsterConfig } from './gridsterConfig.interface';
import { GridsterConfigS } from './gridsterConfigS.interface';


interface Props {
  options: GridsterConfig;
}

export class Gridster extends React.Component<Props> {
  $options: GridsterConfigS;

  columns = 12;
  rows = 12;
  curWidth: number;
  curHeight: number;
  curColWidth: number;
  curRowHeight: number;

  mobile = false;

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
      gridsterColumns.push(
        <div key={'grid-col-' + i} className={styles.gridsterColumn}></div>
      )
    }
    const gridsterRows = [];
    for(let i = 0; i < this.rows; i++) {
      gridsterRows.push(
        <div key={'grid-row-' + i} className={styles.gridsterRow}></div>
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
