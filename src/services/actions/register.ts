import { API_ROOT } from '../../consts/api';
import { User } from '../../types/user';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const POST_REGISTER_REQUEST_PENDING = 'POST_REGISTER_REQUEST_PENDING';
export const POST_REGISTER_REQUEST_FAILED = 'POST_REGISTER_REQUEST_FAILED';
export const POST_REGISTER_REQUEST_SUCCESS = 'POST_REGISTER_REQUEST_SUCCESS';

export function postRegister(email: string, password: string, name: string) {
  return function(dispatch: Function) {
    dispatch({
      type: POST_REGISTER_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/auth/register `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, user: User, accessToken: string, refreshToken: string}>(res => {
      dispatch({
        type: POST_REGISTER_REQUEST_SUCCESS,
        user: res.user,
      });
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    }))
    .catch(handleResponseError('Post register', () => {
      dispatch({
        type: POST_REGISTER_REQUEST_FAILED,
      });
    }));
  };
}
