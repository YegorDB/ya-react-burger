import { Ingredient } from './ingredient';

export type CurrentIngredientState = {
  ingredient: Ingredient | null,
}

export type CurrentOrderState = {
  order: string | null,
}

export type IngredientsState = {
  items: Ingredient[],
}

export type SelectedIngredientsState = {
  bunId: Ingredient['_id'] | null,
  otherIds: Ingredient['_id'][],
}

export type State = {
  currentIngredient: CurrentIngredientState,
  currentOrder: CurrentOrderState,
  ingredients: IngredientsState,
  selectedIngredients: SelectedIngredientsState,
}
