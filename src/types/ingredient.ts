export type Ingredient = {
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

export type IngredientsByType = {
  main: Ingredient[],
  bun: Ingredient[],
  sauce: Ingredient[],
}
