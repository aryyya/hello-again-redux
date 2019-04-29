import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { store } from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root')
const renderApp = () => ReactDOM.render(<App />, root)
store.subscribe(renderApp)
renderApp()

serviceWorker.unregister();
