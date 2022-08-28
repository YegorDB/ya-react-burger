import { SET_CURRENT_ORDER } from '../actions';
import { CurrentOrderAction } from '../../types/actions';
import { CurrentOrderState } from '../../types/states';

const initialState = {
  order: null,
};

const currentOrder = (
  state: CurrentOrderState = initialState,
  action: CurrentOrderAction
) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
}

export default currentOrder;
