import React from 'react'

import { Gridster, GridsterConfig } from 'react-gridster'
import 'react-gridster/dist/index.css'

const App = () => {
  const options: GridsterConfig = {
    gridType: 'fit'
  }
  return <Gridster options={options} />
}

export default App
