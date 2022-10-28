import { feedWS, feedInitialState, profileOrdersWS, profileOrdersInitialState } from './ws';
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

describe('Feed ws reducer', () => {
  it('should return the initial state', () => {
    expect(feedWS(undefined, {} as TFeedWSAction)).toEqual(feedInitialState);
  });

  it('should return connection start', () => {
    const action = {
      type: WS_CONNECTION_FEED_START,
    };

    expect(feedWS(undefined, action)).toEqual(feedInitialState);
  });

  it('should return connection success', () => {
    const action = {
      type: WS_CONNECTION_FEED_SUCCESS,
    };

    expect(feedWS(undefined, action)).toEqual({
      ...feedInitialState,
      wsConnected: true
    });
  });

  it('should return connection eror', () => {
    const action = {
      type: WS_CONNECTION_FEED_ERROR,
    };

    expect(feedWS(undefined, action)).toEqual({
      ...feedInitialState,
      wsConnected: false
    });
  });

  it('should return connection closed', () => {
    const action = {
      type: WS_CONNECTION_FEED_CLOSED,
    };

    expect(feedWS(undefined, action)).toEqual({
      ...feedInitialState,
      wsConnected: false
    });
  });

  it('should return unsuccess message', () => {
    const action = {
      type: WS_GET_MESSAGE_FEED,
      payload: JSON.stringify({
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      }),
    };

    expect(feedWS(undefined, action)).toEqual(feedInitialState);
  });

  it('should return success message', () => {
    const data = {
      success: true,
      orders: [
        {
          ingredients: [],
          _id: '123',
          status: 'done',
          number: 123,
          name: 'order',
          createdAt: '2022-01-01T00:00:00',
          updatedAt: '2022-01-01T00:00:00',
        },
        {
          ingredients: [],
          _id: '1234',
          status: 'done',
          number: 1234,
          name: 'order2',
          createdAt: '2022-01-01T00:00:00',
          updatedAt: '2022-01-01T00:00:00',
        },
      ],
      total: 123,
      totalToday: 12,
    };
    const action = {
      type: WS_GET_MESSAGE_FEED,
      payload: JSON.stringify(data),
    };

    expect(feedWS(undefined, action)).toEqual({
      ...feedInitialState,
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday,
    });
  });
});

describe('Profile orders ws reducer', () => {
  it('should return the initial state', () => {
    expect(profileOrdersWS(undefined, {} as TProfileOrdersWSAction)).toEqual(profileOrdersInitialState);
  });

  it('should return connection start', () => {
    const action = {
      type: WS_CONNECTION_PROFILE_ORDERS_START,
    };

    expect(profileOrdersWS(undefined, action)).toEqual(profileOrdersInitialState);
  });

  it('should return connection success', () => {
    const action = {
      type: WS_CONNECTION_PROFILE_ORDERS_SUCCESS,
    };

    expect(profileOrdersWS(undefined, action)).toEqual({
      ...profileOrdersInitialState,
      wsConnected: true
    });
  });

  it('should return connection eror', () => {
    const action = {
      type: WS_CONNECTION_PROFILE_ORDERS_ERROR,
    };

    expect(profileOrdersWS(undefined, action)).toEqual({
      ...profileOrdersInitialState,
      wsConnected: false
    });
  });

  it('should return connection closed', () => {
    const action = {
      type: WS_CONNECTION_PROFILE_ORDERS_CLOSED,
    };

    expect(profileOrdersWS(undefined, action)).toEqual({
      ...profileOrdersInitialState,
      wsConnected: false
    });
  });

  it('should return unsuccess message', () => {
    const action = {
      type: WS_GET_MESSAGE_PROFILE_ORDERS,
      payload: JSON.stringify({
        success: false,
        orders: [],
      }),
    };

    expect(profileOrdersWS(undefined, action)).toEqual(profileOrdersInitialState);
  });

  it('should return success message', () => {
    const data = {
      success: true,
      orders: [
        {
          ingredients: [],
          _id: '123',
          status: 'done',
          number: 123,
          name: 'order',
          createdAt: '2022-01-01T00:00:00',
          updatedAt: '2022-01-01T00:00:00',
        },
        {
          ingredients: [],
          _id: '1234',
          status: 'done',
          number: 1234,
          name: 'order2',
          createdAt: '2022-01-01T00:00:00',
          updatedAt: '2022-01-01T00:00:00',
        },
      ],
    };
    const action = {
      type: WS_GET_MESSAGE_PROFILE_ORDERS,
      payload: JSON.stringify(data),
    };

    expect(profileOrdersWS(undefined, action)).toEqual({
      ...profileOrdersInitialState,
      orders: data.orders,
    });
  });
});
