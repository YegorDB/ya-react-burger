import { API_ROOT } from '../../consts/api';
import { Ingredient } from '../../types/ingredient';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER = 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER';

export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

export function getIngredients() {
  return function(dispatch: Function) {
    fetch(`${API_ROOT}/ingredients`)
    .then(checkResponse)
    .then(handleResponse<{success: boolean, data: Ingredient[]}>(res => {
      dispatch({
        type: SET_INGREDIENTS,
        items: res.data
      })
    }))
    .catch(handleResponseError('Get ingredients'));
  };
}

export function postOrder(ingredientsIds: Ingredient['_id'][], setModalOpen: Function) {
  return function(dispatch: Function) {
    fetch(`${API_ROOT}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, order: {number: number}}>(res => {
      dispatch({
        type: SET_CURRENT_ORDER,
        orderId: res.order.number.toString()
      })
      setModalOpen(true);
    }))
    .catch(handleResponseError('Post order'));
  };
}
