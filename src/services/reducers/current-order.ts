import { SET_CURRENT_ORDER } from '../actions';
import { CurrentOrderAction } from '../../types/actions';
import { CurrentOrderState } from '../../types/states';

const initialState = {
  orderId: '',
};

const currentOrder = (
  state: CurrentOrderState = initialState,
  action: CurrentOrderAction
) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return {
        ...state,
        orderId: action.orderId,
      };
    default:
      return state;
  }
}

export default currentOrder;
