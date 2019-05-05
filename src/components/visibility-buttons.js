import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { setVisibilityFilter } from '../store/creators/visibility-filter'

const getVisibilityFilterCount = todos => {
  return todos.reduce((count, todo) => ({
    ...count,
    complete:    todo.isComplete ? count.complete   + 1 : count.complete,
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
}, { store }) => {
  const count = getVisibilityFilterCount(todos)

  return (
    <div className="field has-addons">
      {visibilityButtons.map(b => (
        <div
          className="control is-expanded"
          key={b.visibilityFilter}>
          <VisibilityButton
            text={b.text}
            currentVisibilityFilter={visibilityFilter}
            visibilityFilter={b.visibilityFilter}
            setVisibilityFilter={setVisibilityFilter}
            count={b.count(count)}
            style={b.style}
          />
        </div>
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

  const visibilityButtonClassNames = classnames(
    'button',
    'is-fullwidth',
    { 'is-link':    isSelected && style === 1 },
    { 'is-success': isSelected && style === 2 },
    { 'is-danger':  isSelected && style === 3 },
  )

  return (
    <button
      className={visibilityButtonClassNames}
      type="button"
      onClick={() => setVisibilityFilter(visibilityFilter)}>
      {text} ({count})
    </button>
  )
}

const mapStateToProps = ({
  todos,
  visibilityFilter
}) => {
  return {
    todos,
    visibilityFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setVisibilityFilter (filter) {
      dispatch(setVisibilityFilter(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityButtons)
