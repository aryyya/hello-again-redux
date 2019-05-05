import { SET_VISIBILITY_FILTER } from '../types/visibility-filter'
import assert from 'assert'

export const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
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
    type: SET_VISIBILITY_FILTER,
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
