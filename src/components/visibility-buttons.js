import React from 'react'
import './visibility-buttons.css'
import classnames from 'classnames'

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
    <div className="row p-3">
      {visibilityButtons.map(b => (
        <VisibilityButton
          key={b.visibilityFilter}
          text={b.text}
          currentVisibilityFilter={visibilityFilter}
          visibilityFilter={b.visibilityFilter}
          setVisibilityFilter={setVisibilityFilter}
          count={b.count(count)}
          style={b.style}
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
  setVisibilityFilter,
  style
}) => {
  const isSelected = currentVisibilityFilter === visibilityFilter

  const className = classnames(
    'visibility-button',
    'btn',
    {
      'btn-light':   !isSelected,
      'btn-success': isSelected && style === 1,
      'btn-warning': isSelected && style === 2,
      'btn-danger':  isSelected && style === 3,
    },
    'col',
    'rounded-0'
  )

  return (
    <button
      className={className}
      style={{ fontSize: '14px' }}
      type="button"
      onClick={() => setVisibilityFilter(visibilityFilter)}>
      {text} ({count})
    </button>
  )
}

export default VisibilityButtons
