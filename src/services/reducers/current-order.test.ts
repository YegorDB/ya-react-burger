import currentOrder, { initialState } from './current-order';
import {
  POST_ORDER_REQUEST_PENDING,
  POST_ORDER_REQUEST_FAILED,
  POST_ORDER_REQUEST_SUCCESS,
} from '../actions';

describe('Current order reducer', () => {
  it('should return the initial state', () => {
    expect(currentOrder(undefined, {})).toEqual(initialState);
  });

  it('should return current order pending', () => {
    const action = {
      type: POST_ORDER_REQUEST_PENDING,
    };

    expect(currentOrder(undefined, action)).toEqual(initialState);
  });

  it('should return current order failed', () => {
    const action = {
      type: POST_ORDER_REQUEST_FAILED,
    };

    expect(currentOrder(undefined, action)).toEqual(initialState);
  });

  it('should return current order success', () => {
    const orderId = '123';
    const action = {
      type: POST_ORDER_REQUEST_SUCCESS,
      orderId: orderId,
    };

    expect(currentOrder(undefined, action)).toEqual({
      orderId: orderId,
    });
  });
});
