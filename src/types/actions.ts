import { TFeedOrder } from './feed';
import { TIngredient } from './ingredient';
import { TUser } from './user';

import {
  SET_CURRENT_INGREDIENT,
  POST_ORDER_REQUEST_PENDING,
  POST_ORDER_REQUEST_FAILED,
  POST_ORDER_REQUEST_SUCCESS,
  SET_CURRENT_FEED_ORDER,
  GET_INGREDIENTS_REQUEST_PENDING,
  GET_INGREDIENTS_REQUEST_FAILED,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
  CLEAR_CONSTRUCTOR,
  POST_REGISTER_REQUEST_PENDING,
  POST_REGISTER_REQUEST_FAILED,
  POST_LOGIN_REQUEST_PENDING,
  POST_LOGIN_REQUEST_FAILED,
  POST_LOGOUT_REQUEST_PENDING,
  POST_LOGOUT_REQUEST_FAILED,
  POST_LOGOUT_REQUEST_SUCCESS,
  POST_TOKEN_REQUEST_PENDING,
  POST_TOKEN_REQUEST_FAILED,
  POST_TOKEN_REQUEST_SUCCESS,
  GET_USER_REQUEST_PENDING,
  GET_USER_REQUEST_FAILED,
  PATCH_USER_REQUEST_PENDING,
  PATCH_USER_REQUEST_FAILED,
  POST_REGISTER_REQUEST_SUCCESS,
  POST_LOGIN_REQUEST_SUCCESS,
  GET_USER_REQUEST_SUCCESS,
  PATCH_USER_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_PENDING,
  FORGOT_PASSWORD_REQUEST_FAILED,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_PENDING,
  PASSWORD_RESET_REQUEST_FAILED,
  PASSWORD_RESET_REQUEST_SUCCESS,
  WS_CONNECTION_FEED_SUCCESS,
  WS_CONNECTION_FEED_ERROR,
  WS_CONNECTION_FEED_CLOSED,
  WS_CONNECTION_FEED_START,
  WS_CONNECTION_FEED_END,
  WS_GET_MESSAGE_FEED,
  WS_CONNECTION_PROFILE_ORDERS_SUCCESS,
  WS_CONNECTION_PROFILE_ORDERS_ERROR,
  WS_CONNECTION_PROFILE_ORDERS_CLOSED,
  WS_CONNECTION_PROFILE_ORDERS_START,
  WS_CONNECTION_PROFILE_ORDERS_END,
  WS_GET_MESSAGE_PROFILE_ORDERS,
} from '../services/actions';

export type TCurrentIngredientAction = {
  type: typeof SET_CURRENT_INGREDIENT,
  ingredient: TIngredient | null,
}

type TCurrentOrderBaseAction = {
  type: typeof POST_ORDER_REQUEST_PENDING | typeof POST_ORDER_REQUEST_FAILED,
}

type TCurrentOrderSuccessAction = {
  type: typeof POST_ORDER_REQUEST_SUCCESS,
  orderId: string,
}

export type TCurrentOrderAction = TCurrentOrderBaseAction | TCurrentOrderSuccessAction;

export type TCurrentFeedOrderAction = {
  type: typeof SET_CURRENT_FEED_ORDER,
  feedOrder: TFeedOrder | null,
}

type TIngredientsBaseAction = {
  type: typeof GET_INGREDIENTS_REQUEST_PENDING | typeof GET_INGREDIENTS_REQUEST_FAILED,
}

type TIngredientsSuccessAction = {
  type: typeof GET_INGREDIENTS_REQUEST_SUCCESS,
  items: TIngredient[],
}

export type TIngredientsAction = TIngredientsBaseAction | TIngredientsSuccessAction;

type TSelectedIngredientsBaseAction = {
  type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR | typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  ingredientIsABun: boolean,
  ingredientId: TIngredient['_id'],
}

type TSelectedIngredientsOrderAction = {
  type: typeof CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
  from: number,
  to: number,
}

type TSelectedIngredientsClearAction = {
  type: typeof CLEAR_CONSTRUCTOR,
}

export type TSelectedIngredientsAction = TSelectedIngredientsBaseAction | TSelectedIngredientsOrderAction | TSelectedIngredientsClearAction;

type TUserBaseAction = {
  type: (
    typeof POST_REGISTER_REQUEST_PENDING | typeof POST_REGISTER_REQUEST_FAILED |
    typeof POST_LOGIN_REQUEST_PENDING | typeof POST_LOGIN_REQUEST_FAILED |
    typeof POST_LOGOUT_REQUEST_PENDING | typeof POST_LOGOUT_REQUEST_FAILED | typeof POST_LOGOUT_REQUEST_SUCCESS |
    typeof POST_TOKEN_REQUEST_PENDING | typeof POST_TOKEN_REQUEST_FAILED | typeof POST_TOKEN_REQUEST_SUCCESS |
    typeof GET_USER_REQUEST_PENDING | typeof GET_USER_REQUEST_FAILED |
    typeof PATCH_USER_REQUEST_PENDING | typeof PATCH_USER_REQUEST_FAILED
  ),
}

type TUserSuccessAction = {
  type: typeof POST_REGISTER_REQUEST_SUCCESS | typeof POST_LOGIN_REQUEST_SUCCESS | typeof GET_USER_REQUEST_SUCCESS | typeof PATCH_USER_REQUEST_SUCCESS,
  user: TUser,
}

export type TUserAction = TUserBaseAction | TUserSuccessAction;

export type TForgotPasswordAction = {
  type: (
    typeof FORGOT_PASSWORD_REQUEST_PENDING | typeof FORGOT_PASSWORD_REQUEST_FAILED | typeof FORGOT_PASSWORD_REQUEST_SUCCESS |
    typeof PASSWORD_RESET_REQUEST_PENDING | typeof PASSWORD_RESET_REQUEST_FAILED | typeof PASSWORD_RESET_REQUEST_SUCCESS
  ),
}

type TFeedWSWithEventAction = {
  type: typeof WS_CONNECTION_FEED_SUCCESS | typeof WS_CONNECTION_FEED_ERROR | typeof WS_CONNECTION_FEED_CLOSED,
  payload: Event,
}

type TFeedWSConnectionSwitchAction = {
  type: typeof WS_CONNECTION_FEED_START | typeof WS_CONNECTION_FEED_END,
}

type TFeedWSGetMessageAction = {
  type: typeof WS_GET_MESSAGE_FEED,
  payload: string,
}

export type TFeedWSAction = TFeedWSWithEventAction | TFeedWSConnectionSwitchAction | TFeedWSGetMessageAction;

type TProfileOrdersWSWithEventAction = {
  type: typeof WS_CONNECTION_PROFILE_ORDERS_SUCCESS | typeof WS_CONNECTION_PROFILE_ORDERS_ERROR | typeof WS_CONNECTION_PROFILE_ORDERS_CLOSED,
  payload: Event,
}

type TProfileOrdersWSConnectionSwitchAction = {
  type: typeof WS_CONNECTION_PROFILE_ORDERS_START | typeof WS_CONNECTION_PROFILE_ORDERS_END,
}

type TProfileOrdersWSGetMessageAction = {
  type: typeof WS_GET_MESSAGE_PROFILE_ORDERS,
  payload: string,
}

export type TProfileOrdersWSAction = TProfileOrdersWSWithEventAction | TProfileOrdersWSConnectionSwitchAction | TProfileOrdersWSGetMessageAction;

export type TWSActions = TFeedWSAction | TProfileOrdersWSAction;

export type TWSActionTypes = {
  wsInit: typeof WS_CONNECTION_FEED_START | typeof WS_CONNECTION_PROFILE_ORDERS_START,
  wsEnd: typeof WS_CONNECTION_FEED_END | typeof WS_CONNECTION_PROFILE_ORDERS_END,
  onOpen: typeof WS_CONNECTION_FEED_SUCCESS | typeof WS_CONNECTION_PROFILE_ORDERS_SUCCESS,
  onClose: typeof WS_CONNECTION_FEED_CLOSED | typeof WS_CONNECTION_PROFILE_ORDERS_CLOSED,
  onError: typeof WS_CONNECTION_FEED_ERROR | typeof WS_CONNECTION_PROFILE_ORDERS_ERROR,
  onMessage: typeof WS_GET_MESSAGE_FEED | typeof WS_GET_MESSAGE_PROFILE_ORDERS,
}

export type TActions = (
  TCurrentIngredientAction |
  TCurrentOrderAction |
  TCurrentFeedOrderAction |
  TIngredientsAction |
  TSelectedIngredientsAction |
  TUserAction |
  TForgotPasswordAction |
  TFeedWSAction |
  TProfileOrdersWSAction
);
