import { TFeedOrder } from './feed';
import { TIngredient } from './ingredient';
import { TUser } from './user';

export type TCurrentIngredientState = {
  ingredient: TIngredient | null,
}

export type TCurrentOrderState = {
  orderId: string | null,
}

export type TCurrentFeedOrderState = {
  feedOrder: TFeedOrder | null,
}

export type TIngredientsState = {
  items: TIngredient[],
}

type TSelectedIngredientsItemData = {
  id: TIngredient['_id'],
  key: string,
}

export type TSelectedIngredientsState = {
  bunId: TIngredient['_id'] | null,
  itemsData: TSelectedIngredientsItemData[],
}

export type TUserState = {
  user: TUser | null,
  userLoaded: boolean,
}

export type TForgotPasswordState = {
  forgotPasswordUsed: boolean,
}

export type TFeedWSState = {
  wsConnected: boolean;
  orders: TFeedOrder[],
  total: number,
  totalToday: number,
  error?: Event;
}

export type TState = {
  currentIngredient: TCurrentIngredientState,
  currentOrder: TCurrentOrderState,
  currentFeedOrder: TCurrentFeedOrderState,
  ingredients: TIngredientsState,
  selectedIngredients: TSelectedIngredientsState,
  user: TUserState,
  forgotPassword: TForgotPasswordState,
  feedWS: TFeedWSState,
}
