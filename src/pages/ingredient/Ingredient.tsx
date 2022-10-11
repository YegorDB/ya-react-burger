import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '../../components/ingredient-details/IngredientDetails';
import { TBurgerIngredientsItemParams } from '../../types/router';
import { useSelector } from '../../hooks';
import { parseIngredientsById } from '../../utils/parseIngredients';

import styles from './Ingredient.module.css';

export const IngredientPage: FC = () => {
  const {id: ingredientId} = useParams<TBurgerIngredientsItemParams>();
  const ingredients = useSelector(state => state.ingredients.items);

  const ingredientsById = parseIngredientsById(ingredients);
  const ingredient = ingredientsById[ingredientId];

  return (
    <main>
      <div className={ styles.Ingredient }>
        <IngredientDetails ingredient={ ingredient } />
      </div>
    </main>
  );
}
