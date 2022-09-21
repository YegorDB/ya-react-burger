import { postRefreshToken } from './refresh-token';
import { API_ROOT } from '../../consts/api';
import { Ingredient } from '../../types/ingredient';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const POST_ORDER_REQUEST_PENDING = 'POST_ORDER_REQUEST_PENDING';
export const POST_ORDER_REQUEST_FAILED = 'POST_ORDER_REQUEST_FAILED';
export const POST_ORDER_REQUEST_SUCCESS = 'POST_ORDER_REQUEST_SUCCESS';

export function postOrder(ingredientsIds: Ingredient['_id'][], setModalOpen: Function) {
  return function(dispatch: Function) {
    dispatch({
      type: POST_ORDER_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken') || '',
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
    .catch(handleResponseError('Post order', err => {
      if (err.message === 'jwt expired') {
        setTimeout(() => {
          const callback = postOrder(ingredientsIds, setModalOpen);
          postRefreshToken(callback)(dispatch);
        }, 1000);
      } else {
        dispatch({
          type: POST_ORDER_REQUEST_FAILED,
        });
      }
    }));
  };
}
