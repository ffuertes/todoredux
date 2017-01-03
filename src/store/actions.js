/*
 * action types
 */
import { normalize } from 'normalizr';

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

import { getIsFetching } from './reducers';
import * as schema from './schema';
import * as api from './fakeDatabase';

/*
 * action creators
 */

export const addTodo = (text) => (dispatch) => 
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    })
  })

export const toggleTodo = (id) => (dispatch) => 
    api.toggleTodo(id).then(response => {
      dispatch({
        type: TOGGLE_TODO, id
      })
    })  


export const fetchTodos = (filter) => (dispatch, getState) => {
  if ( getIsFetching( getState(), filter) ) {
    //This is a convention for empty async actions
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter  
  });

	return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS', 
        response: normalize(response, schema.arrayOfTodos),
        filter, 
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.'
      })
    }
  );
}
