import React from 'react'
import './App.scss'
import '@fortawesome/fontawesome-free/css/all.css'

import TodoInputForm from './components/todo-input-form'
import VisibilityButtons from './components/visibility-buttons'
import TodoList from './components/todo-list'
import ResetButton from './components/reset-button'

const App = () => {
  return (
    <div className="app content section">
      <div className="columns">
        <div className="column">
          <h1>Todo List</h1>
          <TodoInputForm />
          <VisibilityButtons />
        </div>
        <div className="column">
          <TodoList />
        </div>
      </div>
      <ResetButton>Reset to Defaults</ResetButton>
    </div>
  )
}

export default App
