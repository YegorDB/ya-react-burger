import { Location } from 'history';
import { RouteProps } from 'react-router-dom';

import { TFeedOrder } from './feed';
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
  fromOverride?: Location,
}

export type TFeedItemStatusProps = {
  mode: TFeedOrder['status'],
}

export type TFeedItemIngredientProps = {
  icon: string;
  name: string,
  price: number,
  count: number,
}

export type TFeedItemShortIconsProps = {
  icons: string[],
}

export type TFeedItemShortProps = {
  id: string,
  number: number,
  name: string,
  price: number,
  date: string,
  icons: string[],
  status?: TFeedOrder['status'],
}

export type TFeedItemComponentProps = {
  feedOrder?: TFeedOrder,
}

export type TFeedInfoMainItemProps = {
  title: string,
  orderIds: number[],
  highlighted?: boolean,
}

export type TFeedItemIngredientsProps = {
  ingredients: TIngredient[],
}
