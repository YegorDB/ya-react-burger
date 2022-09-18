import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { useParams } from 'react-router-dom'; 

import { IngredientDetails } from '../../ingredient-details/IngredientDetails';
import { getIngredients } from '../../../services/actions';
import { State } from '../../../types/states';
import { parseIngredientsById } from '../../../utils/parseIngredients';

import styles from './Ingredient.module.css';

export function IngredientPage() {
  const dispatch = useDispatch();

  useEffect(()=> {
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

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
