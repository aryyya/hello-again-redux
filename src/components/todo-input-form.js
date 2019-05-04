import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getId } from '../utility'

const TodoInputForm = (props, { store }) => {
  const [ todoText, setTodoText ] = useState('')
  const [ showError, setShowError ] = useState(false)

  const addTodo = text => {
    store.dispatch({
      type: 'ADD_TODO',
      text,
      id: getId()
    })
  }

  const updateTodoText = text => {
    setTodoText(text)

    if (showError && todoText.length > 1) {
      setShowError(false)
    }
  }

  const onSubmit = event => {
    event.preventDefault()

    if (todoText.length <= 1) {
      setShowError(true)
      return
    }

    addTodo(todoText)
    setTodoText('')
  }

  const todoTextClassNames = classnames(
    'input',
    'is-link',
    { 'is-link': !showError },
    { 'is-danger': showError }
  )

  return (
    <form onSubmit={onSubmit} className="box">
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <div className="control has-icons has-icons-left">
              <span className="icon">
                <i className="far fa-list-alt" />
              </span>
              <input
                className={todoTextClassNames}
                type="text"
                placeholder="What do you have to do?"
                value={todoText}
                onChange={event => updateTodoText(event.target.value)} />
            </div>
            {showError
              ? <p className="help is-danger">Too short! Must be > 1 character.</p>
              : null}
          </div>
          <div className="field">
            <div className="control">
              <input
                className="button is-link is-fullwidth"
                type="submit"
                value="Add Todo" />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

TodoInputForm.contextTypes = {
  store: PropTypes.object
}

export default TodoInputForm
