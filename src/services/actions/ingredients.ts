import { API_ROOT } from '../../consts/api';
import { Ingredient } from '../../types/ingredient';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const GET_INGREDIENTS_REQUEST_PENDING = 'GET_INGREDIENTS_REQUEST_PENDING';
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';

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
