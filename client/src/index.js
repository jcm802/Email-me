// This file is mainly used to set up Redux
import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


// Redux Store Instantiation
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Render App component and root element, pass store to provider as prop, place App inside
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
     document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);