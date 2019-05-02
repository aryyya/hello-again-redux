import React, { useState } from 'react'
import store from '../store'
import { getId } from '../utility'

const TodoInputForm = () => {
  const [ todoText, setTodoText ] = useState('')

  const addTodo = (event) => {
    event.preventDefault()

    store.dispatch({
      type: 'ADD_TODO',
      text: todoText,
      id: getId()
    })

    setTodoText('')
  }

  return (
    <form onSubmit={addTodo}>
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
