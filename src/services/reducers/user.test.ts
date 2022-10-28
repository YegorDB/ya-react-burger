import user, { initialState } from './user';
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

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, {} as TUserAction)).toEqual(initialState);
  });

  it('should return register pending', () => {
    const action = {
      type: POST_REGISTER_REQUEST_PENDING,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return register failed', () => {
    const action = {
      type: POST_REGISTER_REQUEST_FAILED,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return register success', () => {
    const action = {
      type: POST_REGISTER_REQUEST_SUCCESS,
      user: {
        email: 'email',
        name: 'name',
      },
    };

    expect(user(undefined, action)).toEqual({
      user: action.user,
      userLoaded: true,
    });
  });

  it('should return login pending', () => {
    const action = {
      type: POST_LOGIN_REQUEST_PENDING,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return login failed', () => {
    const action = {
      type: POST_LOGIN_REQUEST_FAILED,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return login success', () => {
    const action = {
      type: POST_LOGIN_REQUEST_SUCCESS,
      user: {
        email: 'email',
        name: 'name',
      },
    };

    expect(user(undefined, action)).toEqual({
      user: action.user,
      userLoaded: true,
    });
  });

  it('should return logout pending', () => {
    const action = {
      type: POST_LOGOUT_REQUEST_PENDING,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return logout failed', () => {
    const action = {
      type: POST_LOGOUT_REQUEST_FAILED,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return logout success', () => {
    const action = {
      type: POST_LOGOUT_REQUEST_SUCCESS,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return token pending', () => {
    const action = {
      type: POST_TOKEN_REQUEST_PENDING,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return token failed', () => {
    const action = {
      type: POST_TOKEN_REQUEST_FAILED,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return token success', () => {
    const action = {
      type: POST_TOKEN_REQUEST_SUCCESS,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return token pending', () => {
    const action = {
      type: GET_USER_REQUEST_PENDING,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return token failed', () => {
    const action = {
      type: GET_USER_REQUEST_FAILED,
    };

    expect(user(undefined, action)).toEqual({
      ...initialState,
      userLoaded: true,
    });
  });

  it('should return token success', () => {
    const action = {
      type: GET_USER_REQUEST_SUCCESS,
      user: {
        email: 'email',
        name: 'name',
      },
    };

    expect(user(undefined, action)).toEqual({
      user: action.user,
      userLoaded: true,
    });
  });

  it('should return patch pending', () => {
    const action = {
      type: PATCH_USER_REQUEST_PENDING,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return patch failed', () => {
    const action = {
      type: PATCH_USER_REQUEST_FAILED,
    };

    expect(user(undefined, action)).toEqual(initialState);
  });

  it('should return patch success', () => {
    const action = {
      type: PATCH_USER_REQUEST_SUCCESS,
      user: {
        email: 'email',
        name: 'name',
      },
    };

    expect(user(undefined, action)).toEqual({
      user: action.user,
      userLoaded: true,
    });
  });
});
