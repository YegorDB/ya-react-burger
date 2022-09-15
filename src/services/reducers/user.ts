import {
  POST_REGISTER_REQUEST_PENDING,
  POST_REGISTER_REQUEST_FAILED,
  POST_REGISTER_REQUEST_SUCCESS,
  POST_LOGIN_REQUEST_PENDING,
  POST_LOGIN_REQUEST_FAILED,
  POST_LOGIN_REQUEST_SUCCESS,
  POST_LOGOUT_REQUEST_PENDING,
  POST_LOGOUT_REQUEST_FAILED,
  POST_LOGOUT_REQUEST_SUCCESS,
  POST_TOKEN_REQUEST_PENDING,
  POST_TOKEN_REQUEST_FAILED,
  POST_TOKEN_REQUEST_SUCCESS,
} from '../actions';
import { UserAction } from '../../types/actions';
import { UserState } from '../../types/states';

const initialState = {
  accessToken: null,
  user: null,
};

const user = (
  state: UserState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case POST_REGISTER_REQUEST_PENDING:
      return initialState;
    case POST_REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        user: action.user,
      };
    case POST_REGISTER_REQUEST_FAILED:
      return initialState;

    case POST_LOGIN_REQUEST_PENDING:
      return initialState;
    case POST_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        user: action.user,
      };
    case POST_LOGIN_REQUEST_FAILED:
      return initialState;

    case POST_LOGOUT_REQUEST_PENDING:
      return state;
    case POST_LOGOUT_REQUEST_SUCCESS:
      return initialState;
    case POST_LOGOUT_REQUEST_FAILED:
      return state;

    case POST_TOKEN_REQUEST_PENDING:
      return state;
    case POST_TOKEN_REQUEST_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case POST_TOKEN_REQUEST_FAILED:
      return state;

    default:
      return state;
  }
}

export default user;
