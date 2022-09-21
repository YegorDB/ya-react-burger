import { API_ROOT } from '../../consts/api';
import { User } from '../../types/user';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const POST_LOGIN_REQUEST_PENDING = 'POST_LOGIN_REQUEST_PENDING';
export const POST_LOGIN_REQUEST_FAILED = 'POST_LOGIN_REQUEST_FAILED';
export const POST_LOGIN_REQUEST_SUCCESS = 'POST_LOGIN_REQUEST_SUCCESS';

export function postLogin(email: string, password: string) {
  return function(dispatch: Function) {
    dispatch({
      type: POST_LOGIN_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/auth/login `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, user: User, accessToken: string, refreshToken: string}>(res => {
      dispatch({
        type: POST_LOGIN_REQUEST_SUCCESS,
        user: res.user,
      });
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    }))
    .catch(handleResponseError('Post login', () => {
      dispatch({
        type: POST_LOGIN_REQUEST_FAILED,
      });
    }));
  };
}
