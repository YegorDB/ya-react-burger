import { Location } from 'history';

export type TBaseLocationState = {
  from: Location,
}

export type TAppContentLocationState = {
  ingredientLocation: Location,
  feedItemLocation: Location,
  profileOrderLocation: Location,
}

type ParamsWithId = {
  id: string,
}

export type TBurgerIngredientsItemParams = ParamsWithId;

export type TFeedItemParams = ParamsWithId;
