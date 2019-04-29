import React, { useState } from 'react'
import './App.css'

const App = () => {
  return (
    <div className="container">
      <h1 className="pt-3 pb-2">Todo List</h1>
      <div className="row">
        <div className="col-md-6 pb-4">
          <TodoInputForm />
        </div>
        <div className="col-md-6">
          <TodoList />
        </div>
      </div>
    </div>
  )
}

const TodoInputForm = () => {
  const [ todoText, setTodoText ] = useState('')

  const addTodo = (event) => {
    event.preventDefault()
    console.log(`Adding todo: ${todoText}`)
    setTodoText('')
  }

  return (
    <form onSubmit={addTodo}>
      <input
        className="form-control col rounded-0 mb-2"
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

const TodoList = () => {
  return (
    <ul className="list-group rounded-0">
      <li className="list-group-item rounded-0">Get apples.</li>
      <li className="list-group-item rounded-0">Get bananas.</li>
      <li className="list-group-item rounded-0">Get pears.</li>
    </ul>
  )
}

export default App
