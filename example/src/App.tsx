import React from 'react'

import { GridsterItem, ReactGridster, ReactGridsterItem } from 'react-gridster'
import 'react-gridster/dist/index.css'
import { GridsterConfig } from '../../dist/gridsterConfig.interface'

const option: GridsterConfig = {
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

const item: GridsterItem = {
  x: 1,
  y: 4,
  rows: 10,
  cols: 10
};

const itemComponent = (
        <ReactGridsterItem item={item} >
          <div>
            11111111111111
          </div>
        </ReactGridsterItem>
);

const App = () => {
  return (<ReactGridster options={option} >
    {itemComponent}
  </ReactGridster>)
}

export default App
