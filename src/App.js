import React, { useState } from 'react'
import './App.css'
import { createStore } from 'redux'
import assert from 'assert'

const getIdGenerator = () => {
  let id = 0
  return () => id++
}
const getId = getIdGenerator()


const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        isComplete: false
      }
    case 'TOGGLE_TODO':
      if (state.id === action.id) {
        return {
          ...state,
          isComplete: !state.isComplete
        }
      }
      return state
    default:
      return state
  }
}

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
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(todo_ => todo(todo_, action))
    default:
      return state
  }
}
const testAddTodo = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_TODO',
    text: 'Learn Redux',
    id: 0
  }
  Object.freeze(stateBefore)
  Object.freeze(action)

  const stateAfter = [
    {
      text: 'Learn Redux',
      isComplete: false,
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

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const testVisibilityFilterDefault = () => {
  const stateBefore = undefined
  const action = {}
  Object.freeze(stateBefore)
  Object.freeze(action)

  const stateAfter = 'SHOW_ALL'

  assert.deepStrictEqual(
    visibilityFilter(stateBefore, action),
    stateAfter,
    'testVisibilityFilterDefault' 
  )
}
testVisibilityFilterDefault()

const testVisibilityFilterShowComplete = () => {
  const stateBefore = 'SHOW_ALL'
  const action = {
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETE'
  }
  Object.freeze(stateBefore)
  Object.freeze(action)

  const stateAfter = 'SHOW_COMPLETE'

  assert.deepStrictEqual(
    visibilityFilter(stateBefore, action),
    stateAfter,
    'testVisibilityFilterShowComplete'
  )
}
testVisibilityFilterShowComplete()

const todoApp = (
  state = {},
  action
) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  }
}
export const store = createStore(todoApp)

console.log(store.getState())

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
      text: todoText,
      id: getId()
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
