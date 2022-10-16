import { TIngredient } from './ingredient';
import { TUser } from './user';

export type TCurrentIngredientAction = {
  type: 'SET_CURRENT_INGREDIENT',
  ingredient: TIngredient | null,
}

type TCurrentOrderBaseAction = {
  type: 'POST_ORDER_REQUEST_PENDING' | 'POST_ORDER_REQUEST_FAILED',
}

type TCurrentOrderSuccessAction = {
  type: 'POST_ORDER_REQUEST_SUCCESS',
  orderId: string,
}

export type TCurrentOrderAction = TCurrentOrderBaseAction | TCurrentOrderSuccessAction;

type TIngredientsBaseAction = {
  type: 'GET_INGREDIENTS_REQUEST_PENDING' | 'GET_INGREDIENTS_REQUEST_FAILED',
}

type TIngredientsSuccessAction = {
  type: 'GET_INGREDIENTS_REQUEST_SUCCESS',
  items: TIngredient[],
}

export type TIngredientsAction = TIngredientsBaseAction | TIngredientsSuccessAction;

type TSelectedIngredientsBaseAction = {
  type: 'ADD_INGREDIENT_TO_CONSTRUCTOR' | 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR',
  ingredientIsABun: boolean,
  ingredientId: TIngredient['_id'],
}

type TSelectedIngredientsOrderAction = {
  type: 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER',
  from: number,
  to: number,
}

type TSelectedIngredientsClearAction = {
  type: 'CLEAR_CONSTRUCTOR',
}

export type TSelectedIngredientsAction = TSelectedIngredientsBaseAction | TSelectedIngredientsOrderAction | TSelectedIngredientsClearAction;

type TUserBaseAction = {
  type: (
    'POST_REGISTER_REQUEST_PENDING' | 'POST_REGISTER_REQUEST_FAILED' |
    'POST_LOGIN_REQUEST_PENDING' | 'POST_LOGIN_REQUEST_FAILED' |
    'POST_LOGOUT_REQUEST_PENDING' | 'POST_LOGOUT_REQUEST_FAILED' | 'POST_LOGOUT_REQUEST_SUCCESS' |
    'POST_TOKEN_REQUEST_PENDING' | 'POST_TOKEN_REQUEST_FAILED' | 'POST_TOKEN_REQUEST_SUCCESS' |
    'GET_USER_REQUEST_PENDING' | 'GET_USER_REQUEST_FAILED' |
    'PATCH_USER_REQUEST_PENDING' | 'PATCH_USER_REQUEST_FAILED'
  ),
}

type TUserSuccessAction = {
  type: 'POST_REGISTER_REQUEST_SUCCESS' | 'POST_LOGIN_REQUEST_SUCCESS' | 'GET_USER_REQUEST_SUCCESS' | 'PATCH_USER_REQUEST_SUCCESS',
  user: TUser,
}

export type TUserAction = TUserBaseAction | TUserSuccessAction;

export type TForgotPasswordAction = {
  type: (
    'FORGOT_PASSWORD_REQUEST_PENDING' | 'FORGOT_PASSWORD_REQUEST_FAILED' | 'FORGOT_PASSWORD_REQUEST_SUCCESS' |
    'PASSWORD_RESET_REQUEST_PENDING' | 'PASSWORD_RESET_REQUEST_FAILED' | 'PASSWORD_RESET_REQUEST_SUCCESS'
  ),
}

type TWSWithEventAction = {
  type: 'WS_CONNECTION_SUCCESS' | 'WS_CONNECTION_ERROR' | 'WS_CONNECTION_CLOSED',
  payload: Event,
}

type TWSConnectionStartAction = {
  type: 'WS_CONNECTION_START',
}

type TWSGetMessageAction = {
  type: 'WS_GET_MESSAGE',
  payload: string,
}

export type TWSAction = TWSWithEventAction | TWSConnectionStartAction | TWSGetMessageAction;

export type TActions = (
  TCurrentIngredientAction |
  TCurrentOrderAction |
  TIngredientsAction |
  TSelectedIngredientsAction |
  TUserAction |
  TForgotPasswordAction |
  TWSAction
);
