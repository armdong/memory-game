import React from 'react'
import { render } from 'react-dom'

import './index.css'
import CardList from './components/CardList/CardList'

const App = () => (
  <CardList />
)

render(
  <App />,
  document.querySelector('#root')
)