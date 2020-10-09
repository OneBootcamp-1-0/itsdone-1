import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const history = createBrowserHistory();
let ws = new WebSocket('wss://murmuring-brushlands-70389.herokuapp.com/');

const createWebSocketConnection = (onMessage, onClose) => {
  ws.onmessage = onMessage;
  ws.onclose = () => {
    ws = null;
    onClose();
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <App ws={ws} createWebSocketConnection={createWebSocketConnection} />
    </Router>
  </Provider>
  , document.getElementById('root')
);
