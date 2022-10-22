import { postRefreshToken } from './refresh-token';
import { API_ROOT } from '../../consts/api';
import { AppThunk, AppDispatch } from '../../types';
import { TUser } from '../../types/user';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const GET_USER_REQUEST_PENDING: 'GET_USER_REQUEST_PENDING' = 'GET_USER_REQUEST_PENDING';
export const GET_USER_REQUEST_FAILED: 'GET_USER_REQUEST_FAILED' = 'GET_USER_REQUEST_FAILED';
export const GET_USER_REQUEST_SUCCESS: 'GET_USER_REQUEST_SUCCESS' = 'GET_USER_REQUEST_SUCCESS';

export const PATCH_USER_REQUEST_PENDING: 'PATCH_USER_REQUEST_PENDING' = 'PATCH_USER_REQUEST_PENDING';
export const PATCH_USER_REQUEST_FAILED: 'PATCH_USER_REQUEST_FAILED' = 'PATCH_USER_REQUEST_FAILED';
export const PATCH_USER_REQUEST_SUCCESS: 'PATCH_USER_REQUEST_SUCCESS' = 'PATCH_USER_REQUEST_SUCCESS';

const PATH = `${API_ROOT}/auth/user`;

export const getUser: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST_PENDING,
    });

    fetch(PATH, {
      headers: {
        'Authorization': localStorage.getItem('accessToken') || '',
      },
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, user: TUser}>(res => {
      dispatch({
        type: GET_USER_REQUEST_SUCCESS,
        user: res.user
      });
    }))
    .catch(handleResponseError('Get user', err => {
      if (err.message === 'jwt expired') {
        setTimeout(() => {
          const callback = getUser();
          postRefreshToken(callback)(dispatch);
        }, 1000);
      } else {
        dispatch({
          type: GET_USER_REQUEST_FAILED,
        });
      }
    }));
  };
}

export const patchUser: AppThunk = (name: string, email: string, password: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: PATCH_USER_REQUEST_PENDING,
    });

    fetch(PATH, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, user: TUser}>(res => {
      dispatch({
        type: PATCH_USER_REQUEST_SUCCESS,
        user: res.user
      });
    }))
    .catch(handleResponseError('Patch user', err => {
      if (err.message === 'jwt expired') {
        setTimeout(() => {
          const callback = patchUser(name, email, password);
          postRefreshToken(callback)(dispatch);
        }, 1000);
      } else {
        dispatch({
          type: PATCH_USER_REQUEST_FAILED,
        });
      }
    }));
  };
}
