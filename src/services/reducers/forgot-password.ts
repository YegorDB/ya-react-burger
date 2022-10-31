import {
  FORGOT_PASSWORD_REQUEST_PENDING,
  FORGOT_PASSWORD_REQUEST_FAILED,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_PENDING,
  PASSWORD_RESET_REQUEST_FAILED,
  PASSWORD_RESET_REQUEST_SUCCESS,
} from '../actions';
import { TForgotPasswordAction } from '../../types/actions';
import { TForgotPasswordState } from '../../types/states';

export const initialState: TForgotPasswordState = {
  forgotPasswordUsed: false,
};

const forgotPassword = (
  state: TForgotPasswordState = initialState,
  action: TForgotPasswordAction
): TForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST_PENDING:
      return state
    case FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        forgotPasswordUsed: true,
      }
    case FORGOT_PASSWORD_REQUEST_FAILED:
      return state
    case PASSWORD_RESET_REQUEST_PENDING:
      return state
    case PASSWORD_RESET_REQUEST_SUCCESS:
      return initialState
    case PASSWORD_RESET_REQUEST_FAILED:
      return state
    default:
      return state
  }
}

export default forgotPassword;
