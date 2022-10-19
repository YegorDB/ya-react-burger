import { TIngredient } from '../types/ingredient';
import { TFeedOrder } from '../types/feed';
import { TFeedItemShortProps } from '../types/props';

export function createFeedItemShortProps(
  order: TFeedOrder,
  parsedIngredients: Record<string, TIngredient>,
): TFeedItemShortProps {
  return {
    id: order._id,
    number: order.number,
    name: order.name,
    price: (
      order.ingredients
      .map(id => parsedIngredients[id].price)
      .reduce((prev, curr) => prev + curr)
    ),
    date: order.updatedAt,
    icons: order.ingredients.map(id => parsedIngredients[id].image_mobile),
  };
}
