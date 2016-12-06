/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
import { v4 } from 'node-uuid';

import * as api from './fakeDatabase';

/*
 * action creators
 */

export const addTodo = (text) => ({
  type: ADD_TODO, 
  id: v4(),
  text
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO, id
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS', 
  filter, 
  response
})

export const fetchTodos = (filter) => 
	api.fetchTodos(filter).then(response => receiveTodos(filter, response));