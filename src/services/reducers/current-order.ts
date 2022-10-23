import {
  POST_ORDER_REQUEST_PENDING,
  POST_ORDER_REQUEST_FAILED,
  POST_ORDER_REQUEST_SUCCESS,
} from '../actions';
import { TCurrentOrderAction } from '../../types/actions';
import { TCurrentOrderState } from '../../types/states';

export const initialState: TCurrentOrderState = {
  orderId: null,
};

const currentOrder = (
  state: TCurrentOrderState = initialState,
  action: TCurrentOrderAction
): TCurrentOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST_PENDING:
      return {
        ...state,
        orderId: initialState.orderId,
      };
    case POST_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        orderId: action.orderId,
      };
    case POST_ORDER_REQUEST_FAILED:
      return {
        ...state,
        orderId: initialState.orderId,
      };
    default:
      return state;
  }
}

export default currentOrder;
