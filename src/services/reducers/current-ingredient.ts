import { SET_CURRENT_INGREDIENT } from '../actions';
import { TCurrentIngredientAction } from '../../types/actions';
import { TCurrentIngredientState } from '../../types/states';

const initialState = {
  ingredient: null,
};

const currentIngredient = (
  state: TCurrentIngredientState = initialState,
  action: TCurrentIngredientAction
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
