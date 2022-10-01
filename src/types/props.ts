// @ts-ignore
import { RouteProps } from 'react-router-dom';

import { Ingredient } from './ingredient';

export type TAppHeaderItemProps = {
  icon: Function,
  text: String,
  highlighted?: boolean
}

export type TBurgerConstructorMainItemsItemProps = {
  ingredient: Ingredient,
  index: number,
}

export type TBurgerIngredientsItemProps = {
  ingredient: Ingredient,
}

export type TBurgerIngredientsItemsGroupProps = {
  name: string,
  ingredients: Ingredient[],
}

export type TIngredientDetailsProps = {
  ingredient?: Ingredient | null,
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
