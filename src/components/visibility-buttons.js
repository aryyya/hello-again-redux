import React from 'react'
import store from '../store'

const VisibilityButtons = ({
  todos
}) => {
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

export default VisibilityButtons
