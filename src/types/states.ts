import { Ingredient } from './ingredient';
import { User } from './user';

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

export type UserState = {
  user: User | null,
  userLoaded: boolean,
}

export type ForgotPasswordState = {
  forgotPasswordUsed: boolean,
}

export type State = {
  currentIngredient: CurrentIngredientState,
  currentOrder: CurrentOrderState,
  ingredients: IngredientsState,
  selectedIngredients: SelectedIngredientsState,
  user: UserState,
  forgotPassword: ForgotPasswordState,
}
