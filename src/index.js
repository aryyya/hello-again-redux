import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.css'
import App from './App'
import store from './store'
import * as serviceWorker from './serviceWorker'

class Provider extends Component {
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return this.props.children
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
