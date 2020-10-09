import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const history = createBrowserHistory();
const ws = new WebSocket('wss://murmuring-brushlands-70389.herokuapp.com/');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <App ws={ws}/>
    </Router>
  </Provider>
  , document.getElementById('root')
);
