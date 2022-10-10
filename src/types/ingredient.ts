export type TIngredient = {
  _id: string,
  name: string,
  // type: 'main' | 'bun' | 'sauce',
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

export type TIngredientsByType = {
  main: TIngredient[],
  bun: TIngredient[],
  sauce: TIngredient[],
}
