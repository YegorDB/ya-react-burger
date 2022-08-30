import { Ingredient } from './ingredient';

export type CurrentIngredientAction = {
  type: 'SET_CURRENT_INGREDIENT',
  ingredient: Ingredient,
}

export type CurrentOrderAction = {
  type: 'SET_CURRENT_ORDER',
  orderId: string,
}

export type IngredientsAction = {
  type: 'SET_INGREDIENTS',
  items: Ingredient[],
}

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
