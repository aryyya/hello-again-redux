import React, { useState } from 'react'
import './App.css'
import { createStore } from 'redux'

const getIdGenerator = () => {
  let id = 0
  return () => id++
}
const getId = getIdGenerator()

const defaultTodos = {
  todos: [
    {
      text: 'Wake up.',
      isComplete: true,
      id: getId()
    },
    {
      text: 'Make breakfast.',
      isComplete: false,
      id: getId()
    },
    {
      text: 'Head to class.',
      isComplete: false,
      id: getId()
    }
  ]
}

const todos = (state = defaultTodos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          action.todo
        ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.todo.id) {
              todo.isComplete = !todo.isComplete
            }
            return todo
          })
        ]
      }
    default:
      return state
  }
}

export const store = createStore(todos)

const App = () => {
  return (
    <div className="container">
      <h1 className="pt-3 pb-2">Todo List</h1>
      <div className="row">
        <div className="col-md-6 pb-4">
          <TodoInputForm />
        </div>
        <div className="col-md-6">
          <TodoList />
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
      todo: {
        text: todoText,
        isComplete: false,
        id: getId()
      }
    })

    setTodoText('')
  }

  return (
    <form onSubmit={addTodo}>
      <input
        className="form-control col rounded-0 mb-2"
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

const TodoList = () => {
  const { todos } = store.getState()

  const toggleTodo = todo => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      todo
    })
  }

  return (
    <ul className="list-group rounded-0">
      {todos.map(todo => {
        const style = {
          userSelect: 'none',
          textDecoration: todo.isComplete ? 'line-through' : 'none'
        }
        return (
          <li
            className="list-group-item rounded-0"
            style={style}
            onClick={() => toggleTodo(todo)}
            key={todo.id}>
            {todo.text}
          </li>
        )
      })}
    </ul>
  )
}

export default App
