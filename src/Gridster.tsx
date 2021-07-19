import * as React from 'react';
import { GridsterComponentInterface } from './gridster.interface';
import { GridsterConfigService } from './gridsterConfig.constant';
import { GridsterConfig } from './gridsterConfig.interface';
import { GridsterConfigS } from './gridsterConfigS.interface';
import { GridsterRenderer } from './gridsterRenderer.service';
import styles from './styles.module.css';
import { Renderer } from './utils/renderer';

interface Props {
  options: GridsterConfig;
}

export class ReactGridster extends React.Component<Props> implements GridsterComponentInterface {

  gridRenderer: GridsterRenderer;
  $options: GridsterConfigS;
  options!: GridsterConfig;
  columns = 0;
  rows = 0;
  gridRows: number[] = [];
  gridColumns: number[] = [];
  curWidth!: number;
  curHeight!: number;
  curRowHeight!: number;
  renderer!: Renderer;
  curColWidth!: number;
 
  constructor(props: Props) {
    super(props);
    this.$options = JSON.parse(JSON.stringify(GridsterConfigService));
    this.gridRenderer = new GridsterRenderer(this);

    if (this.props.options) {
      this.options = this.props.options;
      this.columns = this.$options.minCols;
      this.rows = this.$options.minRows;
    }
  }



  componentDidMount() {
    // this.el = document.getElementById('gridster-board') as HTMLDivElement;
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
      <div className={styles.gridster + ' ' + styles.displayGrid + ' ' + styles[this.$options?.gridType]} id="gridster-board">
        { ...gridsterColumns }
        { ...gridsterRows }
        {this.props.children}
      </div>
    )
  }
}
