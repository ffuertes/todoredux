/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
import { v4 } from 'node-uuid';
import { getIsFetching } from './reducers';

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

const requestTodos = (filter) => ({
	type: 'REQUEST_TODOS',
	filter	
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS', 
  filter, 
  response
})

export const fetchTodos = (filter) => (dispatch, getState) => {
  if ( getIsFetching( getState(), filter) ) {
    //This is a convention for empty async actions
    return Promise.resolve();
  }

  dispatch( requestTodos(filter) );

	return api.fetchTodos(filter).then(response => {
    dispatch( receiveTodos(filter, response) );
  })
}
