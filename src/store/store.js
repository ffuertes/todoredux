import { createStore, applyMiddleware } from 'redux';

import promise from 'redux-promise';
import createLogger from 'redux-logger';

import todoApp from './reducers';



//import throttle from 'lodash/throttle';
//import {loadState, saveState} from './localStorage';

//const persistedState = loadState();

//const store = createStore( todoApp, persistedState );
const middlewares = [promise];

if (process.env.NODE_ENV !== 'production' ) {
	middlewares.push( createLogger() );
}


const store = createStore( 
	todoApp,
	applyMiddleware(...middlewares) 
);


export default store;