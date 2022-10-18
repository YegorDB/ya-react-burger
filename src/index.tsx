import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

import './index.css';

import App from './components/app/App';
import { socketMiddleware } from './middlewares/socketMiddleware';
import rootReducer from './services/reducers';
import type { TWSActionTypes } from './types/actions';

const feedWSActionTypes: TWSActionTypes = {
  wsInit: 'WS_CONNECTION_FEED_START',
  onOpen: 'WS_CONNECTION_FEED_SUCCESS',
  onClose: 'WS_CONNECTION_FEED_CLOSED',
  onError: 'WS_CONNECTION_FEED_ERROR',
  onMessage: 'WS_GET_MESSAGE_FEED',
}

const profileOrdersWSActionTypes: TWSActionTypes = {
  wsInit: 'WS_CONNECTION_PROFILE_ORDERS_START',
  onOpen: 'WS_CONNECTION_PROFILE_ORDERS_SUCCESS',
  onClose: 'WS_CONNECTION_PROFILE_ORDERS_CLOSED',
  onError: 'WS_CONNECTION_PROFILE_ORDERS_ERROR',
  onMessage: 'WS_GET_MESSAGE_PROFILE_ORDERS',
}

const composeEnhancers =
  // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware('wss://norma.nomoreparties.space/orders/all', feedWSActionTypes)),
  applyMiddleware(socketMiddleware('wss://norma.nomoreparties.space/orders', profileOrdersWSActionTypes, true)),
);
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
