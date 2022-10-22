import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

import { socketMiddleware } from '../middlewares/socketMiddleware';
import {
  WS_CONNECTION_FEED_SUCCESS,
  WS_CONNECTION_FEED_ERROR,
  WS_CONNECTION_FEED_CLOSED,
  WS_CONNECTION_FEED_START,
  WS_CONNECTION_FEED_END,
  WS_GET_MESSAGE_FEED,
  WS_CONNECTION_PROFILE_ORDERS_SUCCESS,
  WS_CONNECTION_PROFILE_ORDERS_ERROR,
  WS_CONNECTION_PROFILE_ORDERS_CLOSED,
  WS_CONNECTION_PROFILE_ORDERS_START,
  WS_CONNECTION_PROFILE_ORDERS_END,
  WS_GET_MESSAGE_PROFILE_ORDERS,
} from '../services/actions';
import rootReducer from '../services/reducers';
import type { TWSActionTypes } from '../types/actions';

const feedWSActionTypes: TWSActionTypes = {
  wsInit: WS_CONNECTION_FEED_START,
  wsEnd: WS_CONNECTION_FEED_END,
  onOpen: WS_CONNECTION_FEED_SUCCESS,
  onClose: WS_CONNECTION_FEED_CLOSED,
  onError: WS_CONNECTION_FEED_ERROR,
  onMessage: WS_GET_MESSAGE_FEED,
}

const profileOrdersWSActionTypes: TWSActionTypes = {
  wsInit: WS_CONNECTION_PROFILE_ORDERS_START,
  wsEnd: WS_CONNECTION_PROFILE_ORDERS_END,
  onOpen: WS_CONNECTION_PROFILE_ORDERS_SUCCESS,
  onClose: WS_CONNECTION_PROFILE_ORDERS_CLOSED,
  onError: WS_CONNECTION_PROFILE_ORDERS_ERROR,
  onMessage: WS_GET_MESSAGE_PROFILE_ORDERS,
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

export const store = createStore(rootReducer, enhancer);
