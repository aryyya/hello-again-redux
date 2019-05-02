import React from 'react'

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
        {filteredTodos.map(todo => {
          const style = {
            display: 'flex',
            justifyContent: 'space-between',
            userSelect: 'none'
          }
          const textStyle = {
            textDecoration: todo.isComplete ? 'line-through' : 'none'
          }
          const deleteStyle = {
            cursor: 'pointer',
            width: '25px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
          return (
            <li
              className="list-group-item rounded-0"
              style={style}
              onClick={() => toggleTodo(todo.id)}
              key={todo.id}>
              <span style={textStyle}>
                {todo.text}
              </span>
              <span
                className="todo__delete"
                style={deleteStyle}
                onClick={(event) => deleteTodo(todo.id)}>
                <img
                  style={{ width: '15px' }}
                  src="/trash.svg"
                  alt="Delete todo item." />
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TodoList
