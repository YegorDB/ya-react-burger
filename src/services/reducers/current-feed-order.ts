import { SET_CURRENT_FEED_ORDER } from '../actions';
import { TCurrentFeedOrderAction } from '../../types/actions';
import { TCurrentFeedOrderState } from '../../types/states';

export const initialState: TCurrentFeedOrderState = {
  feedOrder: null,
};

const currentFeedOrder = (
  state: TCurrentFeedOrderState = initialState,
  action: TCurrentFeedOrderAction
): TCurrentFeedOrderState => {
  switch (action.type) {
    case SET_CURRENT_FEED_ORDER:
      return {
        ...state,
        feedOrder: action.feedOrder,
      };
    default:
      return state;
  }
}

export default currentFeedOrder;
