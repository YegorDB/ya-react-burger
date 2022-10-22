import {
  WS_CONNECTION_FEED_START,
  WS_CONNECTION_FEED_SUCCESS,
  WS_GET_MESSAGE_FEED,
  WS_CONNECTION_FEED_ERROR,
  WS_CONNECTION_FEED_CLOSED,
  WS_CONNECTION_PROFILE_ORDERS_START,
  WS_CONNECTION_PROFILE_ORDERS_SUCCESS,
  WS_GET_MESSAGE_PROFILE_ORDERS,
  WS_CONNECTION_PROFILE_ORDERS_ERROR,
  WS_CONNECTION_PROFILE_ORDERS_CLOSED,
} from '../actions';
import type { TFeedWSAction, TProfileOrdersWSAction } from '../../types/actions';
import type { TFeed } from '../../types/feed';
import type { TFeedWSState, TProfileOrdersWSState } from '../../types/states';

const feedInitialState: TFeedWSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const profileOrdersInitialState: TProfileOrdersWSState = {
  wsConnected: false,
  orders: [],
};

export const feedWS = (
  state: TFeedWSState = feedInitialState,
  action: TFeedWSAction
): TFeedWSState => {
  switch (action.type) {
    case WS_CONNECTION_FEED_START:
      return feedInitialState;
    case WS_CONNECTION_FEED_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case WS_CONNECTION_FEED_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_FEED_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case WS_GET_MESSAGE_FEED:
      const data = JSON.parse(action.payload) as TFeed;

      if (!data.success) {
        console.log('Unsuccess feed ws get message');
        return state;
      }

      return {
        ...state,
        error: undefined,
        orders: data.orders,
        total: data.total,
        totalToday: data.totalToday,
      };
    default:
      return state;
  }
}

export const profileOrdersWS = (
  state: TProfileOrdersWSState = profileOrdersInitialState,
  action: TProfileOrdersWSAction
): TProfileOrdersWSState => {
  switch (action.type) {
    case WS_CONNECTION_PROFILE_ORDERS_START:
      return profileOrdersInitialState;
    case WS_CONNECTION_PROFILE_ORDERS_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case WS_CONNECTION_PROFILE_ORDERS_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_PROFILE_ORDERS_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case WS_GET_MESSAGE_PROFILE_ORDERS:
      const data = JSON.parse(action.payload) as TFeed;

      if (!data.success) {
        console.log('Unsuccess profile orders ws get message');
        return state;
      }

      return {
        ...state,
        error: undefined,
        orders: data.orders,
      };
    default:
      return state;
  }
}
