import uuid from 'uuidv4';

import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
} from '../actions';
import { SelectedIngredientsAction } from '../../types/actions';
import { SelectedIngredientsState } from '../../types/states';

const initialState = {
  bunId: null,
  itemsData: [],
};

const selectedIngredients = (
  state: SelectedIngredientsState = initialState,
  action: SelectedIngredientsAction
) => {
  const itemsDataCopy = [...state.itemsData];
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
        itemsData: [
          ...state.itemsData,
          {
            id: action.ingredientId,
            key: uuid(),
          },
        ],
      };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      if (action.ingredientIsABun) {
        console.log('Bun ingredient is undeletable.');
        return state;
      }
      const index = itemsDataCopy.map(i => i.id).indexOf(action.ingredientId);
      if (index === -1) {
        console.log(`There is no an ingredient witn id ${action.ingredientId} in order.`);
        return state;
      }
      itemsDataCopy.splice(index, 1);
      return {
        ...state,
        itemsData: itemsDataCopy,
      };
    case CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER:
      if (action.from === action.to) return state;
      if (action.from < action.to) {
        itemsDataCopy.splice(action.to + 1, 0, itemsDataCopy[action.from]);
        itemsDataCopy.splice(action.from, 1);
      } else {
        itemsDataCopy.splice(action.to, 0, itemsDataCopy[action.from]);
        itemsDataCopy.splice(action.from + 1, 1);
      }
      return {
        ...state,
        itemsData: itemsDataCopy,
      };
    default:
      return state
  }
}

export default selectedIngredients;
