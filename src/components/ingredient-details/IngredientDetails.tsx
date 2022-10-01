import cn from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { TIngredientDetailsProps, TCurrentIngredientDetailsProps } from '../../types/props'
import { State } from '../../types/states';
import { parseIngredientsById } from '../../utils/parseIngredients';

import styles from './IngredientDetails.module.css';

export const IngredientDetails: FC<TIngredientDetailsProps> = ({ ingredient }) => {
  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.IngredientDetails}>
      <img className="mb-4" src={ingredient.image_large} alt={ingredient.name} />
      <p className="mb-8 text text_type_main-medium">{ingredient.name}</p>
      <div className={cn('text_color_inactive', styles.IngredientDetailsData)}>
        <div>
          <p className="mb-2 text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div>
          <p className="mb-2 text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div>
          <p className="mb-2 text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div>
          <p className="mb-2 text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export const CurrentIngredientDetails: FC<TCurrentIngredientDetailsProps> = ({ ingredientId }) => {
  let { ingredient, ingredients } = useSelector((state: State) => ({
    ingredient: state.currentIngredient.ingredient,
    ingredients: state.ingredients.items,
  }));

  if (!ingredient && ingredientId) {
    const parsedIngredients = parseIngredientsById(ingredients);
    ingredient = parsedIngredients[ingredientId] || null;
  }

  return (
    <IngredientDetails ingredient={ ingredient } />
  );
}
