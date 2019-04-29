import React, { useState } from 'react'
import './App.css'
import { createStore } from 'redux'
import assert from 'assert'

const getIdGenerator = () => {
  let id = 0
  return () => id++
}
const getId = getIdGenerator()

const defaultTodos = [
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

const todos = (state = defaultTodos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          todo.isComplete = !todo.isComplete
        }
        return todo
      })
    default:
      return state
  }
}

export const store = createStore(todos)

const testAddTodo = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_TODO',
    todo: {
      text: 'Learn Redux',
      isCompleted: false,
      id: 0
    }
  }
  Object.freeze(stateBefore)
  Object.freeze(action)

  const stateAfter = [
    {
      text: 'Learn Redux',
      isCompleted: false,
      id: 0
    }
  ]

  assert.deepStrictEqual(
    todos(stateBefore, action),
    stateAfter,
    "test ADD_TODO"
  )
}
testAddTodo()

const testToggleTodo = () => {
  const stateBefore = [
    { text: 'Eat oranges.', isComplete: false, id: 0 },
    { text: 'Eat bananas.', isComplete: false, id: 1 }
  ]
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }
  Object.freeze(stateBefore)
  Object.freeze(action)

  const stateAfter = [
    { text: 'Eat oranges.', isComplete: false, id: 0 },
    { text: 'Eat bananas.', isComplete: true,  id: 1 }
  ]

  assert.deepStrictEqual(
    todos(stateBefore, action),
    stateAfter,
    'test TOGGLE_TODO'
  )
}
testToggleTodo()

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
  const todos = store.getState()

  const toggleTodo = id => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id
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
            onClick={() => toggleTodo(todo.id)}
            key={todo.id}>
            {todo.text}
          </li>
        )
      })}
    </ul>
  )
}

export default App
