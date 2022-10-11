import { API_ROOT } from '../../consts/api';
import { AppThunk, AppDispatch } from '../../types';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';

export const FORGOT_PASSWORD_REQUEST_PENDING: 'FORGOT_PASSWORD_REQUEST_PENDING' = 'FORGOT_PASSWORD_REQUEST_PENDING';
export const FORGOT_PASSWORD_REQUEST_FAILED: 'FORGOT_PASSWORD_REQUEST_FAILED' = 'FORGOT_PASSWORD_REQUEST_FAILED';
export const FORGOT_PASSWORD_REQUEST_SUCCESS: 'FORGOT_PASSWORD_REQUEST_SUCCESS' = 'FORGOT_PASSWORD_REQUEST_SUCCESS';

export const PASSWORD_RESET_REQUEST_PENDING: 'PASSWORD_RESET_REQUEST_PENDING' = 'PASSWORD_RESET_REQUEST_PENDING';
export const PASSWORD_RESET_REQUEST_FAILED: 'PASSWORD_RESET_REQUEST_FAILED' = 'PASSWORD_RESET_REQUEST_FAILED';
export const PASSWORD_RESET_REQUEST_SUCCESS: 'PASSWORD_RESET_REQUEST_SUCCESS' = 'PASSWORD_RESET_REQUEST_SUCCESS';

export const forgotPassword: AppThunk = (email: string, callback: Function) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, message: string}>(res => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST_SUCCESS,
      });
      callback();
    }))
    .catch(handleResponseError('Forgot password', () => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST_FAILED,
      });
    }));
  };
}

export const passwordReset: AppThunk = (password: string, token: string, callback: Function) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "token": token,
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, message: string}>(res => {
      dispatch({
        type: PASSWORD_RESET_REQUEST_SUCCESS,
      });
      callback();
    }))
    .catch(handleResponseError('Reset password', () => {
      dispatch({
        type: PASSWORD_RESET_REQUEST_FAILED,
      });
    }));
  };
}
