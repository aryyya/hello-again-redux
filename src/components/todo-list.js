import React from 'react'
import './todo-list.css'

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
      <h3>{titleText} ({filteredTodos.length})</h3>
      <ul>
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
  return (
    <li key={todo.id}>
      <span>{todo.text}</span>
      <span onClick={() => toggleTodo(todo.id)}>
        <img
          style={{ width: '16px' }}
          src="/check.svg"
          alt="Toggle todo item." />
      </span>
      <span onClick={() => deleteTodo(todo.id)}>
        <img
          style={{ width: '15px', position: 'relative', marginLeft: '4px'  }}
          src="/trash.svg"
          alt="Delete todo item." />
      </span>
    </li>
  )
}

export default TodoList
