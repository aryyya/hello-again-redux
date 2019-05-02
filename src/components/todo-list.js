import React from 'react'
import store from '../store'

const TodoList = ({
  todos,
  visibilityFilter
}) => {
  const toggleTodo = id => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id
    })
  }

  const deleteTodo = (event, id) => {
    event.stopPropagation()
    store.dispatch({
      type: 'DELETE_TODO',
      id
    })
  }

  const filteredTodos = todos.filter(todo => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return true
      case 'SHOW_COMPLETE':
        return todo.isComplete
      case 'SHOW_INCOMPLETE':
        return !todo.isComplete
      default:
        return true
    }
  })

  const titleText = (() => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':        return 'All Todos'
      case 'SHOW_COMPLETE':   return 'Complete Todos'
      case 'SHOW_INCOMPLETE': return 'Incomplete Todos'
      default:                return ''
    }
  })()

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
                onClick={(event) => deleteTodo(event, todo.id)}>
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
