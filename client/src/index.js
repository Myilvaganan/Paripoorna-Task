import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import combinedReducers from './reducers/combinedReducers';

const middlewares = [ thunk ];

const initialState = {};
const store = createStore(combinedReducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
