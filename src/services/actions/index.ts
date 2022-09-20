import { API_ROOT } from '../../consts/api';
import { Ingredient } from '../../types/ingredient';
import { User } from '../../types/user';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';
// import ingredients from '../../utils/ingredients-data';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER = 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER';

export const GET_INGREDIENTS_REQUEST_PENDING = 'GET_INGREDIENTS_REQUEST_PENDING';
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const POST_ORDER_REQUEST_PENDING = 'POST_ORDER_REQUEST_PENDING';
export const POST_ORDER_REQUEST_FAILED = 'POST_ORDER_REQUEST_FAILED';
export const POST_ORDER_REQUEST_SUCCESS = 'POST_ORDER_REQUEST_SUCCESS';

export const POST_REGISTER_REQUEST_PENDING = 'POST_REGISTER_REQUEST_PENDING';
export const POST_REGISTER_REQUEST_FAILED = 'POST_REGISTER_REQUEST_FAILED';
export const POST_REGISTER_REQUEST_SUCCESS = 'POST_REGISTER_REQUEST_SUCCESS';

export const POST_LOGIN_REQUEST_PENDING = 'POST_LOGIN_REQUEST_PENDING';
export const POST_LOGIN_REQUEST_FAILED = 'POST_LOGIN_REQUEST_FAILED';
export const POST_LOGIN_REQUEST_SUCCESS = 'POST_LOGIN_REQUEST_SUCCESS';

export const POST_LOGOUT_REQUEST_PENDING = 'POST_LOGOUT_REQUEST_PENDING';
export const POST_LOGOUT_REQUEST_FAILED = 'POST_LOGOUT_REQUEST_FAILED';
export const POST_LOGOUT_REQUEST_SUCCESS = 'POST_LOGOUT_REQUEST_SUCCESS';

export const POST_TOKEN_REQUEST_PENDING = 'POST_TOKEN_REQUEST_PENDING';
export const POST_TOKEN_REQUEST_FAILED = 'POST_TOKEN_REQUEST_FAILED';
export const POST_TOKEN_REQUEST_SUCCESS = 'POST_TOKEN_REQUEST_SUCCESS';

export const GET_USER_REQUEST_PENDING = 'GET_USER_REQUEST_PENDING';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';
export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';

export const PATCH_USER_REQUEST_PENDING = 'PATCH_USER_REQUEST_PENDING';
export const PATCH_USER_REQUEST_FAILED = 'PATCH_USER_REQUEST_FAILED';
export const PATCH_USER_REQUEST_SUCCESS = 'PATCH_USER_REQUEST_SUCCESS';

export function getIngredients() {
  return function(dispatch: Function) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/ingredients`)
    .then(checkResponse)
    .then(handleResponse<{success: boolean, data: Ingredient[]}>(res => {
      dispatch({
        type: GET_INGREDIENTS_REQUEST_SUCCESS,
        items: res.data
      });
    }))
    .catch(handleResponseError('Get ingredients', () => {
      dispatch({
        type: GET_INGREDIENTS_REQUEST_FAILED,
      });
    }));
  };
}

export function postOrder(ingredientsIds: Ingredient['_id'][], setModalOpen: Function) {
  return function(dispatch: Function) {
    dispatch({
      type: POST_ORDER_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, order: {number: number}}>(res => {
      dispatch({
        type: POST_ORDER_REQUEST_SUCCESS,
        orderId: res.order.number.toString()
      });
      setModalOpen(true);
    }))
    .catch(handleResponseError('Post order', err => {
      if (err.message === 'jwt expired') {
        setTimeout(() => {
          const callback = postOrder(ingredientsIds, setModalOpen);
          postRefreshToken(callback)(dispatch);
        }, 1000);
      } else {
        dispatch({
          type: POST_ORDER_REQUEST_FAILED,
        });
      }
    }));
  };
}

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

export function postLogout() {
  return function(dispatch: Function) {
    dispatch({
      type: POST_LOGOUT_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/auth/logout `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      })
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean}>(res => {
      dispatch({
        type: POST_LOGOUT_REQUEST_SUCCESS,
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }))
    .catch(handleResponseError('Post logout', () => {
      dispatch({
        type: POST_LOGOUT_REQUEST_FAILED,
      });
    }));
  };
}

export function postRefreshToken(callback: Function) {
  return function(dispatch: Function) {
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

export function getUser() {
  return function(dispatch: Function) {
    dispatch({
      type: GET_USER_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/auth/user`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken') || '',
      },
    })
    .then(checkResponse)
    .then(handleResponse<{success: boolean, user: User}>(res => {
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

export function patchUser(name: string, email: string, password: string) {
  return function(dispatch: Function) {
    dispatch({
      type: PATCH_USER_REQUEST_PENDING,
    });

    fetch(`${API_ROOT}/auth/user`, {
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
    .then(handleResponse<{success: boolean, user: User}>(res => {
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
