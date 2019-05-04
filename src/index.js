import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import * as serviceWorker from './serviceWorker'

const root = document.getElementById('root')
const renderApp = () => {
  ReactDOM.render(
    <App {...store.getState()} />,
    root
  )
}
store.subscribe(renderApp)
renderApp()

serviceWorker.unregister()
