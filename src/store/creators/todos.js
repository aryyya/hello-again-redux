import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO
} from '../types/todos'
import { getId } from '../../utility'

export const addTodo = text => ({
  type: ADD_TODO,
  text,
  id: getId()
})

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
})

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
})
