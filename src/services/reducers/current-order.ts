import {
  POST_ORDER_REQUEST_PENDING,
  POST_ORDER_REQUEST_FAILED,
  POST_ORDER_REQUEST_SUCCESS,
} from '../actions';
import { CurrentOrderAction } from '../../types/actions';
import { CurrentOrderState } from '../../types/states';

const initialState = {
  orderId: null,
};

const currentOrder = (
  state: CurrentOrderState = initialState,
  action: CurrentOrderAction
) => {
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
