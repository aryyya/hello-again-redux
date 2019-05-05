import { myCreateStore, myCombineReducers } from '../my-redux'

import { todos } from './reducers/todos'
import { visibilityFilter } from './reducers/visibility-filter'

const todoApp = myCombineReducers({
  todos,
  visibilityFilter
})

const store = myCreateStore(
  todoApp,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
