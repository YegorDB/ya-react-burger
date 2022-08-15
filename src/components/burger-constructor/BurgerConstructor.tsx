import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { IngredientShape } from '../../prop-types/ingredient'
import { Ingredient, IngredientsByType } from '../../types/ingredient'

import styles from './BurgerConstructor.module.css';

function parseIngredients(ingredients: Ingredient[]) {
  const ingredientsByType: IngredientsByType = {bun: [], main: [], sauce: []};
  for (const item of ingredients) {
    ingredientsByType[item.type as keyof IngredientsByType].push(item);
  }
  return ingredientsByType;
}

function BurgerConstructorItem(props: {ingredient: Ingredient}) {
  const {ingredient} = props;

  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="hidden-overflow">
      <div className={cn('mt-4 mb-4 ml-3 mr-3', styles.BurgerConstructorItem)} onClick={handleOpenModal}>
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <div className={cn('mt-1 mb-1', styles.BurgerConstructorItemPrise)}>
          <p className="mr-1 text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div>
          <p className={cn('text text_type_main-default', styles.BurgerConstructorItemName)}>{ingredient.name}</p>
        </div>
        <Counter count={1} size="default" />
      </div>
      {isModalOpen && (
        <Modal handleClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
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
          <BurgerConstructorItem ingredient={ingredient} key={ingredient._id}/>
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
      <div className={cn('custom-scroll', styles.BurgerConstructorItems)}>
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
