import { API_ROOT } from '../../consts/api';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const POST_LOGOUT_REQUEST_PENDING = 'POST_LOGOUT_REQUEST_PENDING';
export const POST_LOGOUT_REQUEST_FAILED = 'POST_LOGOUT_REQUEST_FAILED';
export const POST_LOGOUT_REQUEST_SUCCESS = 'POST_LOGOUT_REQUEST_SUCCESS';

export function postLogout() {
  return function(dispatch: Function) {
    dispatch({
      type: POST_LOGOUT_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/auth/logout `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean}>(res => {
      dispatch({
        type: POST_LOGOUT_REQUEST_SUCCESS,
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }))
    .catch(handleResponseError('Post logout', () => {
      dispatch({
        type: POST_LOGOUT_REQUEST_FAILED,
      });
    }));
  };
}
