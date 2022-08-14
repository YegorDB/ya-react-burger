import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Button, ConstructorElement, CurrencyIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientShape } from '../../prop-types/ingredient'
import { Ingredient } from '../../types/ingredient'

import styles from './BurgerIngredients.module.css';

function parseIngredients(ingredients: Ingredient[]) {
  const ingredientsById: Record<string, Ingredient> = {};
  for (const item of ingredients) {
    ingredientsById[item._id] = item;
  }
  return ingredientsById;
}

function BurgerIngredients(props: {
  ingredients: Ingredient[],
  bunId?: string,
  otherIds?: string[],
}) {
  const ingredientsById = parseIngredients(props.ingredients);

  console.log('ingredientsById', ingredientsById);

  const bunIngredient = props.bunId && ingredientsById[props.bunId];
  const otherIngredients = props.otherIds && props.otherIds.map(id => ingredientsById[id]).filter(Boolean);

  let totalPrice = bunIngredient ? bunIngredient.price * 2 : 0;
  if (otherIngredients) {
    totalPrice = otherIngredients.reduce(
      (previousPrice, ingredient) => previousPrice + ingredient.price,
      totalPrice
    );
  }

  return (
    <div className="mt-25 pl-4 pr-4">
      {bunIngredient && (
        <div className={cn('ml-8', styles.BurgerIngredientsFirstBun)}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunIngredient.name} (верх)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
          />
        </div>
      )}
      {otherIngredients && (
        <div
          style={{maxHeight: 85 * otherIngredients.length}}
          className={cn('custom-scroll', styles.BurgerIngredientsMainItems)}
        >
          {otherIngredients.map((ingredient, index) => (
            <div style={{display: 'flex', alignItems: 'center'}} key={ingredient._id}>
              <div className="mr-2">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
      )}
      {bunIngredient && (
        <div className={cn('ml-8', styles.BurgerIngredientsLastBun)}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunIngredient.name} (низ)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
          />
        </div>
      )}
      <div className="mt-10">
        <div className={styles.BurgerIngredientsTotal}>
          <p className="mr-1 text text_type_digits-medium">{totalPrice}</p>
          <div className="mr-10">
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientShape),
  bunId: PropTypes.string,
  otherIds: PropTypes.arrayOf(PropTypes.string),
};

export default BurgerIngredients;
