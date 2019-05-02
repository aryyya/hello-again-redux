import React from 'react'
import './App.css'
import { getId } from './utility'
import store from './store'

import TodoInputForm from './components/todo-input-form'
import VisibilityButtons from './components/visibility-buttons'
import TodoList from './components/todo-list'

const { dispatch } = store

const addTodo = text => {
  dispatch({
    type: 'ADD_TODO',
    text,
    id: getId()
  })
}

const setVisibilityFilter = filter => {
  dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter
  })
}

const toggleTodo = id => {
  dispatch({
    type: 'TOGGLE_TODO',
    id
  })
}

const deleteTodo = id => {
  dispatch({
    type: 'DELETE_TODO',
    id
  })
}

const App = ({
  todos,
  visibilityFilter
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="pt-3 pb-2">Todo List</h1>
          <TodoInputForm
            addTodo={addTodo}/>
          <VisibilityButtons
            todos={todos}
            visibilityFilter={visibilityFilter}
            setVisibilityFilter={setVisibilityFilter} />
        </div>
        <div className="col-md-6">
          <TodoList
            todos={todos}
            visibilityFilter={visibilityFilter}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo} />
        </div>
      </div>
    </div>
  )
}

export default App
