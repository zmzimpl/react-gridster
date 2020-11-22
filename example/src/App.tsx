import React from 'react'

import { Gridster } from 'react-gridster'
import 'react-gridster/dist/index.css'
import { GridsterConfig } from '../../dist/gridsterConfig.interface'

const App = () => {
  const options: GridsterConfig = {
    gridType: 'fit'
  }
  return <Gridster options={options} />
}

export default App
