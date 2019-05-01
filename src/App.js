import React, { useState } from 'react'
import './App.css'
import { getId } from './utility'
import store from './store'

const App = ({
  todos,
  visibilityFilter
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="pt-3 pb-2">Todo List</h1>
          <TodoInputForm />
          <VisibilityButtons
            todos={todos}
            visibilityFilter={visibilityFilter} />
        </div>
        <div className="col-md-6">
          <TodoList
            todos={todos}
            visibilityFilter={visibilityFilter} />
        </div>
      </div>
    </div>
  )
}

const TodoInputForm = () => {
  const [ todoText, setTodoText ] = useState('')

  const addTodo = (event) => {
    event.preventDefault()

    store.dispatch({
      type: 'ADD_TODO',
      text: todoText,
      id: getId()
    })

    setTodoText('')
  }

  return (
    <form onSubmit={addTodo}>
      <input
        className="form-control col rounded-0 mb-3"
        type="text"
        placeholder="What do you have to do?"
        value={todoText}
        onChange={event => setTodoText(event.target.value)} />
      <input
        className="btn btn-primary col rounded-0"
        type="submit"
        value="Add Todo" />
    </form>
  )
}

const TodoList = ({
  todos,
  visibilityFilter
}) => {
  const toggleTodo = id => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id
    })
  }

  const deleteTodo = (event, id) => {
    event.stopPropagation()
    store.dispatch({
      type: 'DELETE_TODO',
      id
    })
  }

  const filteredTodos = todos.filter(todo => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return true
      case 'SHOW_COMPLETE':
        return todo.isComplete
      case 'SHOW_INCOMPLETE':
        return !todo.isComplete
      default:
        return true
    }
  })

  const titleText = (() => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':        return 'All Todos'
      case 'SHOW_COMPLETE':   return 'Complete Todos'
      case 'SHOW_INCOMPLETE': return 'Incomplete Todos'
      default:                return ''
    }
  })()

  return (
    <div>
      <h3 className="pt-3 pb-2 text-md-right">{titleText} ({filteredTodos.length})</h3>
      <ul className="list-group rounded-0">
        {filteredTodos.map(todo => {
          const style = {
            display: 'flex',
            justifyContent: 'space-between',
            userSelect: 'none'
          }
          const textStyle = {
            textDecoration: todo.isComplete ? 'line-through' : 'none'
          }
          const deleteStyle = {
            cursor: 'pointer',
            width: '25px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
          return (
            <li
              className="list-group-item rounded-0"
              style={style}
              onClick={() => toggleTodo(todo.id)}
              key={todo.id}>
              <span style={textStyle}>
                {todo.text}
              </span>
              <span
                className="todo__delete"
                style={deleteStyle}
                onClick={(event) => deleteTodo(event, todo.id)}>
                <img
                  style={{ width: '15px' }}
                  src="/trash.svg"
                  alt="Delete todo item." />
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const VisibilityButtons = ({
  todos
}) => {
  const setVisibility = filter => {
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    })
  }

  const count = todos.reduce((count, todo) => ({
    ...count,
    complete: todo.isComplete ? count.complete + 1 : count.complete,
    incomplete: !todo.isComplete ? count.incomplete + 1 : count.incomplete
  }), { complete: 0, incomplete: 0 })

  const buttonStyle = {
    fontSize: '14px'
  }
  return (
    <div className="row p-3">
      <button
        className="btn btn-success col rounded-0"
        style={buttonStyle}
        type="button"
        onClick={() => setVisibility('SHOW_ALL')}>
        All ({todos.length})
      </button>
      <button
        className="btn btn-warning col rounded-0"
        style={buttonStyle}
        type="button"
        onClick={() => setVisibility('SHOW_COMPLETE')}>
        Complete ({count.complete})
      </button>
      <button
        className="btn btn-danger col rounded-0"
        style={buttonStyle}
        type="button"
        onClick={() => setVisibility('SHOW_INCOMPLETE')}>
        Incomplete ({count.incomplete})
      </button>
    </div>
  )
}

export default App
