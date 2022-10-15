import { RouteProps } from 'react-router-dom';

import { TIngredient } from './ingredient';

export type TAppHeaderItemProps = {
  icon: Function,
  text: String,
  highlighted?: boolean
}

export type TBurgerConstructorMainItemsItemProps = {
  ingredient: TIngredient,
  index: number,
}

export type TBurgerIngredientsItemProps = {
  ingredient: TIngredient,
}

export type TBurgerIngredientsItemsGroupProps = {
  name: string,
  ingredients: TIngredient[],
}

export type TIngredientDetailsProps = {
  ingredient?: TIngredient | null,
}

export type TCurrentIngredientDetailsProps = {
  ingredientId?: string,
}

export type TModalHeaderProps = {
  closeHandler: React.MouseEventHandler,
  title?: string,
}

export type TModalProps = {
  handleClose: Function,
  children: React.ReactNode,
  title?: string,
}

export type TModalOverlayProps = {
  closeHandler: React.MouseEventHandler,
}

export type TOrderDetailsProps = {
  orderId: string | null,
}

export type TProtectedRouteProps = RouteProps & {
  children: React.ReactNode,
}

type TFeedItemStatus = 'done' | 'inProgress' | 'canceled';

export type TFeedItemStatusProps = {
  mode: TFeedItemStatus,
}

export type TFeedItemIngredientProps = {
  name: string,
  price: number,
  count: number,
}

export type TFeedItemIconsProps = {
  icons: string[],
}

export type TFeedItemProps = {
  id: string,
  name: string,
  price: number,
  date: string,
  icons: string[],
  status?: TFeedItemStatus,
}
