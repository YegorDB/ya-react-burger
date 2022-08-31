import { API_ROOT } from '../../consts/api';
import { Ingredient } from '../../types/ingredient';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER = 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER';

export const GET_INGREDIENTS_REQUEST_PENDING = 'GET_INGREDIENTS_REQUEST_PENDING';
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const POST_ORDER_REQUEST_PENDING = 'POST_ORDER_REQUEST_PENDING';
export const POST_ORDER_REQUEST_FAILED = 'POST_ORDER_REQUEST_FAILED';
export const POST_ORDER_REQUEST_SUCCESS = 'POST_ORDER_REQUEST_SUCCESS';

export function getIngredients() {
  return function(dispatch: Function) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/ingredients`)
    .then(checkResponse)
    .then(handleResponse<{success: boolean, data: Ingredient[]}>(res => {
      dispatch({
        type: GET_INGREDIENTS_REQUEST_SUCCESS,
        items: res.data
      });
    }))
    .catch(handleResponseError('Get ingredients', () => {
      dispatch({
        type: GET_INGREDIENTS_REQUEST_FAILED,
      });
    }));
  };
}

export function postOrder(ingredientsIds: Ingredient['_id'][], setModalOpen: Function) {
  return function(dispatch: Function) {
    dispatch({
      type: POST_ORDER_REQUEST_PENDING,
    });

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
        type: POST_ORDER_REQUEST_SUCCESS,
        orderId: res.order.number.toString()
      });
      setModalOpen(true);
    }))
    .catch(handleResponseError('Post order', () => {
      dispatch({
        type: POST_ORDER_REQUEST_FAILED,
      });
    }));
  };
}
