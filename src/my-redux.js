export const myCombineReducers = reducers => {
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

export const myCreateStore = topReducer => {
  let state
  const subscribers = []

  const getState = () => state

  const subscribe = subscriber => subscribers.push(subscriber)

  const dispatch = action => {
    state = topReducer(state, action)
    subscribers.forEach(subscriber => subscriber())
  }

  state = topReducer(state, {})

  return { getState, subscribe, dispatch }
}
