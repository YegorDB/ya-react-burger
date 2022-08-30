import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
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
  const otherIdsCopy = [...state.otherIds];
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
    case CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER:
      if (action.from === action.to) return state;
      if (action.from < action.to) {
        otherIdsCopy.splice(action.to + 1, 0, otherIdsCopy[action.from]);
        otherIdsCopy.splice(action.from, 1);
      } else {
        otherIdsCopy.splice(action.to, 0, otherIdsCopy[action.from]);
        otherIdsCopy.splice(action.from + 1, 1);
      }
      return {
        ...state,
        otherIds: otherIdsCopy,
      };
    default:
      return state
  }
}

export default selectedIngredients;
