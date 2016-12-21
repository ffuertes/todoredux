import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import todos from './reducers/';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production' ) {
	middlewares.push( createLogger() );
}


const store = createStore( 
	todos,
	applyMiddleware(...middlewares) 
);


export default store;