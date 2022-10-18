import { WS_CONNECTION_PROFILE_ORDERS_START } from './ws';
import { API_ROOT } from '../../consts/api';
import { AppDispatch } from '../../types';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const POST_TOKEN_REQUEST_PENDING: 'POST_TOKEN_REQUEST_PENDING' = 'POST_TOKEN_REQUEST_PENDING';
export const POST_TOKEN_REQUEST_FAILED: 'POST_TOKEN_REQUEST_FAILED' = 'POST_TOKEN_REQUEST_FAILED';
export const POST_TOKEN_REQUEST_SUCCESS: 'POST_TOKEN_REQUEST_SUCCESS' = 'POST_TOKEN_REQUEST_SUCCESS';

export const postRefreshToken = (callback: Function) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_TOKEN_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/auth/token `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, accessToken: string, refreshToken: string}>(res => {
      dispatch({
        type: POST_TOKEN_REQUEST_SUCCESS,
      });
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      callback(dispatch);
      dispatch({type: WS_CONNECTION_PROFILE_ORDERS_START});
    }))
    .catch(handleResponseError('Post token', () => {
      dispatch({
        type: POST_TOKEN_REQUEST_FAILED,
      });
      setTimeout(() => {
        postRefreshToken(callback)(dispatch);
      }, 1000);
    }));
  };
}
