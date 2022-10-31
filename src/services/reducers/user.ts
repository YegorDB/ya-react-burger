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
  GET_USER_REQUEST_PENDING,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  PATCH_USER_REQUEST_PENDING,
  PATCH_USER_REQUEST_FAILED,
  PATCH_USER_REQUEST_SUCCESS,
} from '../actions';
import { TUserAction } from '../../types/actions';
import { TUserState } from '../../types/states';

export const initialState: TUserState = {
  user: null,
  userLoaded: false,
};

const user = (
  state: TUserState = initialState,
  action: TUserAction
): TUserState => {
  switch (action.type) {
    case POST_REGISTER_REQUEST_PENDING:
      return {
        ...state,
        user: initialState.user,
      };
    case POST_REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.user,
        userLoaded: true,
      };
    case POST_REGISTER_REQUEST_FAILED:
      return {
        ...state,
        user: initialState.user,
      };

    case POST_LOGIN_REQUEST_PENDING:
      return {
        ...state,
        user: initialState.user,
      };
    case POST_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.user,
        userLoaded: true,
      };
    case POST_LOGIN_REQUEST_FAILED:
      return {
        ...state,
        user: initialState.user,
      };

    case POST_LOGOUT_REQUEST_PENDING:
      return state;
    case POST_LOGOUT_REQUEST_SUCCESS:
      return initialState;
    case POST_LOGOUT_REQUEST_FAILED:
      return state;

    case POST_TOKEN_REQUEST_PENDING:
      return state;
    case POST_TOKEN_REQUEST_SUCCESS:
      return state;
    case POST_TOKEN_REQUEST_FAILED:
      return state;

    case GET_USER_REQUEST_PENDING:
      return state;
    case GET_USER_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.user,
        userLoaded: true,
      };
    case GET_USER_REQUEST_FAILED:
      return {
        ...state,
        user: initialState.user,
        userLoaded: true,
      };

    case PATCH_USER_REQUEST_PENDING:
      return state;
    case PATCH_USER_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.user,
        userLoaded: true,
      };
    case PATCH_USER_REQUEST_FAILED:
      return state;

    default:
      return state;
  }
}

export default user;
