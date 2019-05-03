import React, { useState } from 'react'
import './todo-list.css'
import classnames from 'classnames'

const todoFilterTests = {
  'SHOW_ALL':        ()   => true,
  'SHOW_COMPLETE':   todo => todo.isComplete,
  'SHOW_INCOMPLETE': todo => !todo.isComplete
}

const getFilteredTodos = (todos, visibilityFilter) => {
  const visibilityFilterTest = todoFilterTests[visibilityFilter]
  return todos.filter(visibilityFilterTest)
}

const getTitleText = visibilityFilter => ({
  'SHOW_ALL':        'All Todos',
  'SHOW_COMPLETE':   'Complete Todos',
  'SHOW_INCOMPLETE': 'Incomplete Todos'
}[visibilityFilter])

const TodoList = ({
  todos,
  visibilityFilter,
  toggleTodo,
  deleteTodo
}) => {
  const filteredTodos = getFilteredTodos(todos, visibilityFilter)
  const titleText = getTitleText(visibilityFilter)

  return (
    <div>
      <h3 className="pt-3 pb-2 text-md-right">{titleText} ({filteredTodos.length})</h3>
      <ul className="list-group rounded-0">
        {filteredTodos.map(todo => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  )
}

const TodoListItem = ({
  todo,
  toggleTodo,
  deleteTodo
}) => {
  const [ deleteIsHovered, setDeleteIsHovered ] = useState(false)

  const classNames = classnames(
    'todo-list-item',
    { 'todo-list-item--is-complete': todo.isComplete },
    { 'todo-list-item--delete-is-hovered': deleteIsHovered },
    'list-group-item',
    'rounded-0'
  )
  return (
    <li
      className={classNames}
      onClick={() => toggleTodo(todo.id)}
      key={todo.id}>
      <span className="todo-list-item__text">
        {todo.text}
      </span>
      <span
        className="todo-list-item__delete"
        onClick={(event) => deleteTodo(todo.id)}
        onMouseOver={() => setDeleteIsHovered(true)}
        onMouseLeave={() => setDeleteIsHovered(false)}>
        <img
          style={{ width: '15px', position: 'relative', marginLeft: '4px'  }}
          src="/trash.svg"
          alt="Delete todo item." />
      </span>
    </li>
  )
}

export default TodoList
