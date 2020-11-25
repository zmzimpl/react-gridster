import React from 'react'

import { Gridster } from 'react-gridster'
import 'react-gridster/dist/index.css'
import { GridsterConfig } from '../../dist/gridsterConfig.interface'

const App = () => {
  const options: GridsterConfig = {
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
  return <Gridster options={options} />
}

export default App
