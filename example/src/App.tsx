import React from 'react'

import { Gridster } from 'react-gridster'
import 'react-gridster/dist/index.css'
import { GridsterConfig } from '../../dist/gridsterConfig.interface'

export class App extends React.Component {
  options: GridsterConfig = {
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
  }
  render() {
    return (
      <Gridster ref={this.gridsterRef} options={this.options} />
    )
  }
}

export default App
