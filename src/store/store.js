import { myCreateStore, myCombineReducers } from '../my-redux'

import { todos } from './reducers/todos'
import { visibilityFilter } from './reducers/visibility-filter'

const todoApp = myCombineReducers({
  todos,
  visibilityFilter
})

const store = myCreateStore(todoApp)

// Save state to local storage whenever it is modified.
store.subscribe(() => {
  localStorage.setItem(
    'todo-app',
    JSON.stringify(store.getState())
  )
})

// Load previous state from local storage if it exists.
const previousState = localStorage.getItem('todo-app')
if (previousState) {
  store.setState(
    JSON.parse(previousState)
  )
}

export default store
