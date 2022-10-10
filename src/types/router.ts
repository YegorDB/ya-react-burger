import { Location } from 'history';

export type TBaseLocationState = {
  from: Location,
}

export type TAppContentLocationState = {
  ingredientLocation: Location,
}

export type TBurgerIngredientsItemParams = {
  id: string,
}
