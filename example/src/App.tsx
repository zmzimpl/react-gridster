import React from 'react'

import 'react-gridster/dist/index.css'
import {Gridster, GridsterConfig, GridsterItem} from 'react-gridster';

export class App extends React.Component {
  options: GridsterConfig = {
    minCols: 32,
    maxCols: 32,
    minRows: 21,
    maxRows: 21,
    gridType: 'fit',
    displayGrid: 'always',
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    enableOccupiedCellDrop: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
  }
  gridsterRef: React.RefObject<Gridster>;

  constructor(prop: any) {
    super(prop);
    this.gridsterRef = React.createRef();
  }

  componentDidMount() {
    this.gridsterRef.current?.optionsChanged();
    this.forceUpdate();
  }
  render() {
    const item = {
      x: 0,
      y: 0,
      rows: 10,
      cols: 10
    };
    const items = [];
    if (this.gridsterRef.current) {
      items.push(<GridsterItem item={item} key={'testItem'} gridster={this.gridsterRef.current}>
        <div>
          11111111111111
        </div>
      </GridsterItem>);
    }
    console.log(items);
    return (
      <Gridster ref={this.gridsterRef} options={this.options} >
        {items}
      </Gridster>
    )
  }
}

export default App
