import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as sessionActions from './store/session';
import { csrfFetch } from './store/csrf';
import configureStore from './store';
import { Provider } from 'react-redux';



const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
