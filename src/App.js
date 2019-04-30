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

const myCombineReducers = reducers => {
  const reducersKeys = Object.keys(reducers)
  const getTopReducer = (
    state = {},
    action
  ) => {
    return reducersKeys.reduce((nextState, reducerKey) => {
      const currentReducer = reducers[reducerKey]
      const currentState = state[reducerKey]
      return {
        ...nextState,
        [reducerKey]: currentReducer(currentState, action)
      }
    }, {})
  }
  return getTopReducer
}

const todoApp = myCombineReducers({
  todos,
  visibilityFilter
})

export const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="pt-3 pb-2">Todo List</h1>
          <TodoInputForm />
          <VisibilityButtons />
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

const TodoList = () => {
  const { todos, visibilityFilter } = store.getState()

  const toggleTodo = id => {
    store.dispatch({
      type: 'TOGGLE_TODO',
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
    </div>
  )
}

const VisibilityButtons = () => {
  const { todos } = store.getState()

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
