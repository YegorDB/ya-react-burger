import { postRefreshToken } from './refresh-token';
import { CLEAR_CONSTRUCTOR } from './selected-ingredients';
import { API_ROOT } from '../../consts/api';
import { AppThunk, AppDispatch } from '../../types';
import { TIngredient } from '../../types/ingredient';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const POST_ORDER_REQUEST_PENDING: 'POST_ORDER_REQUEST_PENDING' = 'POST_ORDER_REQUEST_PENDING';
export const POST_ORDER_REQUEST_FAILED: 'POST_ORDER_REQUEST_FAILED' = 'POST_ORDER_REQUEST_FAILED';
export const POST_ORDER_REQUEST_SUCCESS: 'POST_ORDER_REQUEST_SUCCESS' = 'POST_ORDER_REQUEST_SUCCESS';

export const postOrder: AppThunk = (ingredientsIds: TIngredient['_id'][], setModalOpen: Function) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST_PENDING,
    });

    setModalOpen(true);

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
      dispatch({
        type: CLEAR_CONSTRUCTOR,
      });
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
