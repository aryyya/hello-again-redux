import { myCreateStore, myCombineReducers } from './my-redux'
import assert from 'assert'
import { getIdGenerator } from './utility'

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
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id)
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

const todoApp = myCombineReducers({
  todos,
  visibilityFilter
})

export default myCreateStore(
  todoApp,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
