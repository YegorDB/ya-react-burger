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
        console.log('Bun ingredient is undeletable.');
        return state;
      }
      const otherIdsCopy = [...state.otherIds];
      const index = otherIdsCopy.indexOf(action.ingredientId);
      if (index === -1) {
        console.log(`There is no an ingredient witn id ${action.ingredientId} in order.`);
        return state;
      }
      otherIdsCopy.splice(index, 1);
      return {
        ...state,
        otherIds: otherIdsCopy,
      };
    case CLEAR_CONSTRUCTOR_INGREDIENTS:
      return initialState;
    default:
      return state
  }
}

export default selectedIngredients;
