import { myCreateStore, myCombineReducers } from '../my-redux'
import { todos, visibilityFilter } from './reducers'

const todoApp = myCombineReducers({
  todos,
  visibilityFilter
})

const store = myCreateStore(
  todoApp,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
