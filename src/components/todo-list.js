import React from 'react'
import './todo-list.scss'
import classnames from 'classnames'
import store from '../store'

const toggleTodo = id => {
  store.dispatch({
    type: 'TOGGLE_TODO',
    id
  })
}

const deleteTodo = id => {
  store.dispatch({
    type: 'DELETE_TODO',
    id
  })
}

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

const TodoList = () => {
  const { todos, visibilityFilter } = store.getState()
  const filteredTodos = getFilteredTodos(todos, visibilityFilter)
  const titleText = getTitleText(visibilityFilter)

  return (
    <div className="box">
      <h3 className="has-text-left-mobile has-text-right">{titleText} ({filteredTodos.length})</h3>
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
  const todoListItemClassNames = classnames(
    'todo-list-item',
    { 'todo-list-item--is-completed': todo.isComplete },
    'list-item'
  )

  return (
    <li className={todoListItemClassNames}>
      <span>
        <span onClick={() => toggleTodo(todo.id)}>
          <button className="button is-info is-inverted">
            <span className="icon">
              {todo.isComplete
                ? <i className="far fa-check-square" />
                : <i className="far fa-square" />}
            </span>
          </button>
        </span>
        <span className="todo-list-item__text">{todo.text}</span>
      </span>
      <span>
        <span onClick={() => deleteTodo(todo.id)}>
          <button className="button is-danger is-inverted">
            <span className="icon">
              <i className="fas fa-trash-alt" />
            </span>
          </button>
        </span>
      </span>
    </li>
  )
}

export default TodoList
