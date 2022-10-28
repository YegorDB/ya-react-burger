import forgotPassword, { initialState } from './forgot-password';
import {
  FORGOT_PASSWORD_REQUEST_PENDING,
  FORGOT_PASSWORD_REQUEST_FAILED,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_PENDING,
  PASSWORD_RESET_REQUEST_FAILED,
  PASSWORD_RESET_REQUEST_SUCCESS,
} from '../actions';
import { TForgotPasswordAction } from '../../types/actions';

describe('Forgot password reducer', () => {
  it('should return the initial state', () => {
    expect(forgotPassword(undefined, {} as TForgotPasswordAction)).toEqual(initialState);
  });

  it('should return forgot password pending', () => {
    const action = {
      type: FORGOT_PASSWORD_REQUEST_PENDING,
    };

    expect(forgotPassword(undefined, action)).toEqual(initialState);
  });

  it('should return forgot password failed', () => {
    const action = {
      type: FORGOT_PASSWORD_REQUEST_FAILED,
    };

    expect(forgotPassword(undefined, action)).toEqual(initialState);
  });

  it('should return forgot password success', () => {
    const action = {
      type: FORGOT_PASSWORD_REQUEST_SUCCESS,
    };

    expect(forgotPassword(undefined, action)).toEqual({
      forgotPasswordUsed: true,
    });
  });

  it('should return reset password pending', () => {
    const action = {
      type: PASSWORD_RESET_REQUEST_PENDING,
    };

    expect(forgotPassword(undefined, action)).toEqual(initialState);
  });

  it('should return reset password failed', () => {
    const action = {
      type: PASSWORD_RESET_REQUEST_FAILED,
    };

    expect(forgotPassword(undefined, action)).toEqual(initialState);
  });

  it('should return reset password success', () => {
    const action = {
      type: PASSWORD_RESET_REQUEST_SUCCESS,
    };

    expect(forgotPassword(undefined, action)).toEqual(initialState);
  });
});
