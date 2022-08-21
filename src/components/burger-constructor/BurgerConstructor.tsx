import cn from 'classnames';
import React, {useContext} from 'react';

import {
  Button, ConstructorElement, CurrencyIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import { IngredientsContext } from '../../context/ingredients';
import { Ingredient } from '../../types/ingredient'

import styles from './BurgerConstructor.module.css';

function parseIngredients(ingredients: Ingredient[]) {
  const ingredientsById: Record<string, Ingredient> = {};
  for (const item of ingredients) {
    ingredientsById[item._id] = item;
  }
  return ingredientsById;
}

function BurgerConstructor(props: {
  bunId?: string,
  otherIds?: string[],
}) {
  const {bunId, otherIds} = props;

  const [isModalOpen, setModalOpen] = React.useState(false);
  const ingredients = useContext(IngredientsContext);

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const ingredientsById = parseIngredients(ingredients);

  const bunIngredient = bunId && ingredientsById[bunId];
  const otherIngredients = otherIds && otherIds.map(id => ingredientsById[id]).filter(Boolean);

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
        <div className={cn('ml-8', styles.BurgerConstructorFirstBun)}>
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
          className={cn('custom-scroll', styles.BurgerConstructorMainItems)}
        >
          {otherIngredients.map((ingredient, index) => (
            <div className={styles.BurgerConstructorMainItemsItem} key={ingredient._id}>
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
        <div className={cn('ml-8', styles.BurgerConstructorLastBun)}>
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
        <div className={styles.BurgerConstructorTotal}>
          <p className="mr-1 text text_type_digits-medium">{totalPrice}</p>
          <div className="mr-10">
            <CurrencyIcon type="primary" />
          </div>
          <div className="hidden-overflow">
            <Button type="primary" size="medium" onClick={handleOpenModal}>
              Оформить заказ
            </Button>
            {isModalOpen && (
              <Modal handleClose={handleCloseModal}>
                <OrderDetails orderId="034536" />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerConstructor;
