import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
} from '../actions';
import type { TWSAction } from '../../types/actions';
import type { Feed } from '../../types/feed';
import type { TFeedWSState } from '../../types/states';

const initialState: TFeedWSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const feedWS = (
  state: TFeedWSState = initialState,
  action: TWSAction
): TFeedWSState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return initialState;
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      const data = JSON.parse(action.payload) as Feed;

      if (!data.success) {
        console.log('Unsuccess ws get message');
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

export default feedWS;
