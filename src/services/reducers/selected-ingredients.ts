import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
} from '../actions';
import { SelectedIngredientsAction } from '../../types/actions';
import { SelectedIngredientsState } from '../../types/states';

const initialState = {
  bunId: null,
  otherIds: [],
};

const selectedIngredients = (
  state: SelectedIngredientsState = initialState,
  action: SelectedIngredientsAction
) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      if (action.ingredientIsABun) {
        if (state.bunId) {
          console.log('There is a bun ingredient in order already.');
          return state;
        }
        return {
          ...state,
          bunId: action.ingredientId,
        };
      }
      return {
        ...state,
        otherIds: [...state.otherIds, action.ingredientId],
      };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      if (action.ingredientIsABun) {
        if (state.bunId !== action.ingredientId) {
          console.log('Wrong bun ingredient id.');
          return state;
        }
        return {
          ...state,
          bunId: null,
        };
      }
      const index = state.otherIds.indexOf(action.ingredientId);
      if (index === -1) {
        console.log(`There is no an ingredient witn id ${action.ingredientId} in order.`);
        return state;
      }
      return {
        ...state,
        otherIds: state.otherIds.splice(index, 1),
      };
    case CLEAR_CONSTRUCTOR_INGREDIENTS:
      return initialState;
    default:
      return state
  }
}

export default selectedIngredients;
