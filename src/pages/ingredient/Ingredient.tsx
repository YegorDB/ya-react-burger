import React, { FC } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '../../components/ingredient-details/IngredientDetails';
import { TState } from '../../types/states';
import { parseIngredientsById } from '../../utils/parseIngredients';

import styles from './Ingredient.module.css';

export const IngredientPage: FC = () => {
  const {id: ingredientId} = useParams();
  const ingredients = useSelector((state: TState) => state.ingredients.items);

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
