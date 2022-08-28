import { Ingredient } from './ingredient';

export type CurrentIngredientAction = {
  type: 'SET_CURRENT_INGREDIENT',
  ingredient: Ingredient,
}

export type CurrentOrderAction = {
  type: 'SET_CURRENT_ORDER',
  order: string,
}

export type IngredientsAction = {
  type: 'SET_INGREDIENTS',
  items: Ingredient[],
}

export type SelectedIngredientsAction = {
  type: 'ADD_INGREDIENT_TO_CONSTRUCTOR' | 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' | 'CLEAR_CONSTRUCTOR_INGREDIENTS',
  ingredientIsABun: boolean,
  ingredientId: Ingredient['_id'],
}
