import { createStore, applyMiddleware } from 'redux';

//import promise from 'redux-promise';
import createLogger from 'redux-logger';

import todos from './reducers/';

const thunk = (store) => (next) => (action) => 
	typeof action === 'function' ?
		action(store.dispatch) :
		next(action);

//import throttle from 'lodash/throttle';
//import {loadState, saveState} from './localStorage';

//const persistedState = loadState();

//const store = createStore( todoApp, persistedState );
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production' ) {
	middlewares.push( createLogger() );
}


const store = createStore( 
	todos,
	applyMiddleware(...middlewares) 
);


export default store;