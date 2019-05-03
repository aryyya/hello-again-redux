import React from 'react'
import './visibility-buttons.css'

const getVisibilityFilterCount = todos => {
  return todos.reduce((count, todo) => ({
    ...count,
    complete: todo.isComplete ? count.complete + 1 : count.complete,
    incomplete: !todo.isComplete ? count.incomplete + 1 : count.incomplete
  }), { complete: 0, incomplete: 0 })
}

const visibilityButtons = [
  { text: 'All',        visibilityFilter: 'SHOW_ALL',        style: 1, count: count => count.complete + count.incomplete },
  { text: 'Complete',   visibilityFilter: 'SHOW_COMPLETE',   style: 2, count: count => count.complete                    },
  { text: 'Incomplete', visibilityFilter: 'SHOW_INCOMPLETE', style: 3, count: count => count.incomplete                  }
]

const VisibilityButtons = ({
  todos,
  visibilityFilter,
  setVisibilityFilter
}) => {
  const count = getVisibilityFilterCount(todos)

  return (
    <div>
      {visibilityButtons.map(b => (
        <VisibilityButton
          key={b.visibilityFilter}
          text={b.text}
          currentVisibilityFilter={visibilityFilter}
          visibilityFilter={b.visibilityFilter}
          setVisibilityFilter={setVisibilityFilter}
          count={b.count(count)}
        />
      ))}
    </div>
  )
}

const VisibilityButton = ({
  text,
  count,
  currentVisibilityFilter,
  visibilityFilter,
  setVisibilityFilter
}) => {
  return (
    <button
      style={{ fontSize: '14px' }}
      type="button"
      onClick={() => setVisibilityFilter(visibilityFilter)}>
      {text} ({count})
    </button>
  )
}

export default VisibilityButtons
