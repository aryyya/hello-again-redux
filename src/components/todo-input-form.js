import React, { useState } from 'react'

const TodoInputForm = ({
  addTodo
}) => {
  const [ todoText, setTodoText ] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    addTodo(todoText)
    setTodoText('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control col rounded-0 mb-3"
        type="text"
        placeholder="What do you have to do?"
        value={todoText}
        onChange={event => setTodoText(event.target.value)} />
      <input
        className="btn btn-primary col rounded-0"
        type="submit"
        value="Add Todo" />
    </form>
  )
}

export default TodoInputForm
