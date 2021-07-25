import React, { useCallback, useState } from 'react'

import { ReactGridster, ReactGridsterItem } from 'react-gridster'
import 'react-gridster/dist/index.css'
import { GridsterConfig } from '../../dist/gridsterConfig.interface'





const App = () => {
  const option: GridsterConfig = {
    minCols: 32,
    maxCols: 32,
    minRows: 21,
    maxRows: 21,
    margin: 1,
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
  
  const items = [{
    x: 1,
    y: 4,
    rows: 4,
    cols: 4
  }, {
    x: 10,
    y: 8,
    rows: 4,
    cols: 6
  }];

  const [gridster, setGridster] = useState<ReactGridster>();

  const gridsterChange = useCallback(node => {
    setGridster(node);
  }, []);


  return (<ReactGridster options={option} ref={gridsterChange} >
    {items.map((item, index) => {
      return (
        <ReactGridsterItem item={item} key={'gridster-item-' + index} gridster={gridster as ReactGridster}>
          <div>
            11111111111111
          </div>
        </ReactGridsterItem>
      )
    })}
  </ReactGridster>)
}

export default App
