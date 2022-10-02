import { TIngredient, TIngredientsByType } from '../types/ingredient';

export function parseIngredientsById(ingredients: TIngredient[]) {
  const ingredientsById: Record<string, TIngredient> = {};
  for (const item of ingredients) {
    ingredientsById[item._id] = item;
  }
  return ingredientsById;
}

export function parseIngredientsByType(ingredients: TIngredient[]) {
  const ingredientsByType: TIngredientsByType = {bun: [], main: [], sauce: []};
  for (const item of ingredients) {
    ingredientsByType[item.type as keyof TIngredientsByType].push(item);
  }
  return ingredientsByType;
}
