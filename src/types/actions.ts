import { Ingredient } from './ingredient';
import { User } from './user';

export type CurrentIngredientAction = {
  type: 'SET_CURRENT_INGREDIENT',
  ingredient: Ingredient,
}

type CurrentOrderBaseAction = {
  type: 'POST_ORDER_REQUEST_PENDING' | 'POST_ORDER_REQUEST_FAILED',
}

type CurrentOrderSuccessAction = {
  type: 'POST_ORDER_REQUEST_SUCCESS',
  orderId: string,
}

export type CurrentOrderAction = CurrentOrderBaseAction | CurrentOrderSuccessAction;

type IngredientsBaseAction = {
  type: 'GET_INGREDIENTS_REQUEST_PENDING' | 'GET_INGREDIENTS_REQUEST_FAILED',
}

type IngredientsSuccessAction = {
  type: 'GET_INGREDIENTS_REQUEST_SUCCESS',
  items: Ingredient[],
}

export type IngredientsAction = IngredientsBaseAction | IngredientsSuccessAction;

type SelectedIngredientsBaseAction = {
  type: 'ADD_INGREDIENT_TO_CONSTRUCTOR' | 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR',
  ingredientIsABun: boolean,
  ingredientId: Ingredient['_id'],
}

type SelectedIngredientsOrderAction = {
  type: 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER',
  from: number,
  to: number,
}

export type SelectedIngredientsAction = SelectedIngredientsBaseAction | SelectedIngredientsOrderAction;

type UserBaseAction = {
  type: (
    'POST_REGISTER_REQUEST_PENDING' | 'POST_REGISTER_REQUEST_FAILED' |
    'POST_LOGIN_REQUEST_PENDING' | 'POST_LOGIN_REQUEST_FAILED' |
    'POST_LOGOUT_REQUEST_PENDING' | 'POST_LOGOUT_REQUEST_FAILED' | 'POST_LOGOUT_REQUEST_SUCCESS' |
    'POST_TOKEN_REQUEST_PENDING' | 'POST_TOKEN_REQUEST_FAILED'
  ),
}

type UserSuccessWithDataAction = {
  type: 'POST_REGISTER_REQUEST_SUCCESS' | 'POST_LOGIN_REQUEST_SUCCESS',
  user: User,
  accessToken: string,
}

type UserSuccessTokenAction = {
  type: 'POST_TOKEN_REQUEST_SUCCESS',
  accessToken: string,
}

export type UserAction = UserBaseAction | UserSuccessWithDataAction | UserSuccessTokenAction;
