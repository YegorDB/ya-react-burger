import {
  GET_INGREDIENTS_REQUEST_PENDING,
  GET_INGREDIENTS_REQUEST_FAILED,
  GET_INGREDIENTS_REQUEST_SUCCESS,
} from '../actions';
import { TIngredientsAction } from '../../types/actions';
import { TIngredientsState } from '../../types/states';

const initialState = {
  items: [],
};

const ingredients = (
  state: TIngredientsState = initialState,
  action: TIngredientsAction
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST_PENDING:
      return {
        ...state,
        items: initialState.items,
      }
    case GET_INGREDIENTS_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.items,
      }
    case GET_INGREDIENTS_REQUEST_FAILED:
      return {
        ...state,
        items: initialState.items,
      }
    default:
      return state
  }
}

export default ingredients;
