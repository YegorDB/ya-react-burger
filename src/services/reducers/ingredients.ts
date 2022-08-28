import { SET_INGREDIENTS } from '../actions';
import { IngredientsAction } from '../../types/actions';
import { IngredientsState } from '../../types/states';

const initialState = {
  items: [],
};

const ingredients = (
  state: IngredientsState = initialState,
  action: IngredientsAction
) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        items: action.items,
      }
    default:
      return state
  }
}

export default ingredients;
