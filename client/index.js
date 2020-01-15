import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components'
require('dotenv').config()

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
