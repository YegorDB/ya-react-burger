import { SET_CURRENT_INGREDIENT } from '../actions';
import { CurrentIngredientAction } from '../../types/actions';
import { CurrentIngredientState } from '../../types/states';

const initialState = {
  ingredient: null,
};

const currentIngredient = (
  state: CurrentIngredientState = initialState,
  action: CurrentIngredientAction
) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        ingredient: action.ingredient,
      };
    default:
      return state;
  }
}

export default currentIngredient;
