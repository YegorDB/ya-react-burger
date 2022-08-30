import cn from 'classnames';
import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button, ConstructorElement, CurrencyIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  postOrder,
} from '../../services/actions';
import { Ingredient } from '../../types/ingredient'
import { State } from '../../types/states';

import styles from './BurgerConstructor.module.css';

function parseIngredients(ingredients: Ingredient[]) {
  const ingredientsById: Record<string, Ingredient> = {};
  for (const item of ingredients) {
    ingredientsById[item._id] = item;
  }
  return ingredientsById;
}

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const { ingredients, bunId, otherIds, orderId } = useSelector((state: State) => ({
    ingredients: state.ingredients.items,
    bunId: state.selectedIngredients.bunId,
    otherIds: state.selectedIngredients.otherIds,
    orderId: state.currentOrder.orderId,
  }));

  const [, dropTarget] = useDrop({
      accept: 'ingredients-item',
      drop(ingredient: Ingredient) {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          ingredientIsABun: ingredient.type === 'bun',
          ingredientId: ingredient._id
        });
      },
  });

  const handleOrderConfirmation = () => {
    const ingredientsIds = [bunId, ...otherIds];
    if (ingredientsIds.length === 0) return;

    // @ts-ignore
    dispatch(postOrder(ingredientsIds, setModalOpen));
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const ingredientsById = parseIngredients(ingredients);

  const bunIngredient = bunId && ingredientsById[bunId];
  const otherIngredients = useMemo(() => {
    return otherIds && otherIds.map(id => ingredientsById[id]).filter(Boolean);
  }, [otherIds, ingredientsById]);

  const totalPrice = useMemo(() => {
    let value = bunIngredient ? bunIngredient.price * 2 : 0;
    if (otherIngredients) {
      value = otherIngredients.reduce(
        (previousPrice, ingredient) => previousPrice + ingredient.price,
        value
      );
    }
    return value;
  }, [bunIngredient, otherIngredients]);

  const handleRemove = (ingredient: Ingredient) => {
    return () => {
      dispatch({
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        ingredientIsABun: ingredient.type === 'bun',
        ingredientId: ingredient._id
      });
    };
  };

  return (
    <div ref={dropTarget} className="mt-25 pl-4 pr-4">
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
                handleClose={handleRemove(ingredient)}
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
            <Button type="primary" size="medium" onClick={handleOrderConfirmation}>
              Оформить заказ
            </Button>
            {isModalOpen && (
              <Modal handleClose={handleCloseModal}>
                <OrderDetails orderId={orderId} />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerConstructor;
