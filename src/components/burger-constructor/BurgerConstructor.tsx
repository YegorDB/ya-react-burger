import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './BurgerConstructor.module.css';

type Ingredient = {
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

type IngredientsByType = {
  main: Ingredient[],
  bun: Ingredient[],
  sauce: Ingredient[],
}

const IngredientShape = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
})

function parseIngredients(ingredients: Ingredient[]) {
  const ingredientsByType: IngredientsByType = {bun: [], main: [], sauce: []};
  for (const item of ingredients) {
    ingredientsByType[item.type as keyof IngredientsByType].push(item);
  }
  return ingredientsByType;
}

function BurgerConstructorItem(props: {ingredient: Ingredient}) {
  return (
    <div className={cn('mt-4 mb-4 ml-3 mr-3', styles.BurgerConstructorItem)}>
      <img className="ml-4 mr-4" src={props.ingredient.image} />
      <div className={cn('mt-1 mb-1', styles.BurgerConstructorItemPrise)}>
        <p className="mr-1 text text_type_digits-default">{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div>
        <p className={cn('text text_type_main-default', styles.BurgerConstructorItemName)}>{props.ingredient.name}</p>
      </div>
      <Counter count={1} size="default" />
    </div>
  );
}

BurgerConstructorItem.propTypes = {
  ingredient: IngredientShape,
};

function BurgerConstructorItemsGroup(props: {name: string, ingredients: Ingredient[]}) {
  return (
    <div>
      <p className="text text_type_main-medium">
        {props.name}
      </p>
      <div className={cn('pt-2 pb-6 pl-1 pr-1', styles.BurgerConstructorItemsGroup)}>
        {props.ingredients.map(ingredient => (
          <BurgerConstructorItem ingredient={ingredient}/>
        ))}
      </div>
    </div>
  );
}

BurgerConstructorItemsGroup.propTypes = {
  name: PropTypes.string,
  ingredients: PropTypes.arrayOf(IngredientShape),
};

function BurgerConstructor(props: {ingredients: Ingredient[]}) {
  const [currentTab, setCurrentTab] = React.useState('1');

  const {
    bun: bunIngredients,
    sauce: sauceIngredients,
    main: mainIngredients,
  } = parseIngredients(props.ingredients);

  return (
    <div>
      <p className="mt-10 mb-5 text text_type_main-large">
        Соберите бургер
      </p>
      <div className={cn('mb-10', styles.BurgerConstructorTabs)}>
        <Tab value="1" active={currentTab === '1'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="2" active={currentTab === '2'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="3" active={currentTab === '3'} onClick={setCurrentTab}>
          Начинки
        </Tab>
        </div>
      <div className={styles.BurgerConstructorItems}>
        <BurgerConstructorItemsGroup name="Булки" ingredients={bunIngredients} />
        <BurgerConstructorItemsGroup name="Соусы" ingredients={sauceIngredients} />
        <BurgerConstructorItemsGroup name="Начинки" ingredients={mainIngredients} />
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientShape),
};

export default BurgerConstructor;
