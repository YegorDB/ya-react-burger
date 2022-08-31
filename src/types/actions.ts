import { Ingredient } from './ingredient';

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
