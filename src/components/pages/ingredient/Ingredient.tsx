import React from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '../../ingredient-details/IngredientDetails';
import { State } from '../../../types/states';
import { parseIngredientsById } from '../../../utils/parseIngredients';

import styles from './Ingredient.module.css';

export function IngredientPage() {
  const {id: ingredientId} = useParams();
  const ingredients = useSelector((state: State) => state.ingredients.items);

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