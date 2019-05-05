import React, { useState } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { addTodo } from '../store/creators/todos'

const TodoInputForm = ({
  addTodo
}) => {
  const [ todoText, setTodoText ] = useState('')
  const [ showError, setShowError ] = useState(false)

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

const mapDispatchToProps = dispatch => {
  return {
    addTodo (id) {
      dispatch(addTodo(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(TodoInputForm)
