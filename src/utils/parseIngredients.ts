import { Ingredient, IngredientsByType } from '../types/ingredient';

export function parseIngredientsById(ingredients: Ingredient[]) {
  const ingredientsById: Record<string, Ingredient> = {};
  for (const item of ingredients) {
    ingredientsById[item._id] = item;
  }
  return ingredientsById;
}

export function parseIngredientsByType(ingredients: Ingredient[]) {
  const ingredientsByType: IngredientsByType = {bun: [], main: [], sauce: []};
  for (const item of ingredients) {
    ingredientsByType[item.type as keyof IngredientsByType].push(item);
  }
  return ingredientsByType;
}
