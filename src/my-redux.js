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
  let subscribers = []

  const getState = () => {
    return state
  }

  const setState = newState => {
    state = newState
  }

  const subscribe = subscriber => {
    subscribers.push(subscriber)
    return () => {
      subscribers = subscribers.filter(subscriber_ => subscriber_ !== subscriber)
    }
  }

  const dispatch = action => {
    state = topReducer(state, action)
    subscribers.forEach(subscriber => subscriber())
  }

  state = topReducer(state, {})

  return { getState, setState, subscribe, dispatch }
}
