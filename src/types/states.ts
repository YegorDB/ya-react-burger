import { Ingredient } from './ingredient';

export type CurrentIngredientState = {
  ingredient: Ingredient | null,
}

export type CurrentOrderState = {
  orderId: string,
}

export type IngredientsState = {
  items: Ingredient[],
}

type SelectedIngredientsItemData = {
  id: Ingredient['_id'],
  key: string,
}

export type SelectedIngredientsState = {
  bunId: Ingredient['_id'] | null,
  itemsData: SelectedIngredientsItemData[],
}

export type State = {
  currentIngredient: CurrentIngredientState,
  currentOrder: CurrentOrderState,
  ingredients: IngredientsState,
  selectedIngredients: SelectedIngredientsState,
}
