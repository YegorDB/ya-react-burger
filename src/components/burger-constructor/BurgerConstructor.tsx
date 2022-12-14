import cn from 'classnames';
import React, { FC, useEffect, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Button, ConstructorElement, CurrencyIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../hooks';

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
  postOrder,
  getUser,
} from '../../services/actions';
import { TOtherIngredientsData } from '../../types/data'
import { TIngredient } from '../../types/ingredient'
import { TBurgerConstructorMainItemsItemProps } from '../../types/props';
import { parseIngredientsById } from '../../utils/parseIngredients';

import styles from './BurgerConstructor.module.css';

const BurgerConstructorMainItemsItem: FC<TBurgerConstructorMainItemsItemProps> = ({
  ingredient,
  index,
}) => {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'constructor-item',
    item: {index},
  });

  const [, dropTarget] = useDrop({
      accept: 'constructor-item',
      drop(item: {index: number}) {
        dispatch({
          type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
          from: item.index,
          to: index
        });
      },
  });

  const handleRemove = () => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      ingredientIsABun: ingredient.type === 'bun',
      ingredientId: ingredient._id
    });
  };

  return (
    <div ref={dragRef}>
      <div ref={dropTarget} className={styles.BurgerConstructorMainItemsItem}>
        <div className="mr-2">
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={handleRemove}
        />
      </div>
    </div>
  )
}

const BurgerConstructor: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const { user, userLoaded, ingredients, bunId, itemsData, orderId } = useSelector(state => ({
    user: state.user.user,
    userLoaded: state.user.userLoaded,
    ingredients: state.ingredients.items,
    bunId: state.selectedIngredients.bunId,
    itemsData: state.selectedIngredients.itemsData,
    orderId: state.currentOrder.orderId,
  }));

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [, dropTarget] = useDrop({
      accept: 'ingredients-item',
      drop(ingredient: TIngredient) {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          ingredientIsABun: ingredient.type === 'bun',
          ingredientId: ingredient._id
        });
      },
  });

  const handleOrderConfirmation = () => {
    // @ts-ignore
    if (!user && !window.Cypress) {
      history.push({
        pathname: '/login',
        state: { from: location },
      });
      return;
    }

    if (!bunId) return;

    const otherIds = itemsData.map(i => i.id);
    const ingredientsIds = [bunId, ...otherIds, bunId];
    if (ingredientsIds.length === 0) return;

    dispatch(postOrder(ingredientsIds, setModalOpen));
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const ingredientsById = parseIngredientsById(ingredients);

  const bunIngredient = bunId && ingredientsById[bunId];
  const otherIngredientsData = useMemo<TOtherIngredientsData[]>(() => {
    return itemsData && (
      itemsData
      .filter(({id}) => id in ingredientsById)
      .map(({id, key}) => ({ingredient: ingredientsById[id], key}))
    );
  }, [itemsData, ingredientsById]);

  const totalPrice = useMemo<number>(() => {
    let value = bunIngredient ? bunIngredient.price * 2 : 0;
    if (otherIngredientsData) {
      value = otherIngredientsData.map(({ingredient}) => ingredient).reduce(
        (previousPrice, ingredient) => previousPrice + ingredient.price,
        value
      );
    }
    return value;
  }, [bunIngredient, otherIngredientsData]);

  if (!userLoaded) {
    return null;
  }

  return (
    <div ref={dropTarget} className="mt-25 pl-4 pr-4 BurgerConstructorDropTarget">
      {bunIngredient && (
        <div className={cn('ml-8', styles.BurgerConstructorFirstBun, 'BurgerConstructorDropTargetItem')}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunIngredient.name} (????????)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
          />
        </div>
      )}
      {otherIngredientsData && (
        <div
          style={{maxHeight: 85 * otherIngredientsData.length}}
          className={cn('custom-scroll', styles.BurgerConstructorMainItems)}
        >
          {otherIngredientsData.map(({ingredient, key}, index) => (
            <div key={key} className="BurgerConstructorDropTargetItem">
              <BurgerConstructorMainItemsItem
                ingredient={ingredient}
                index={index}
              />
            </div>
          ))}
        </div>
      )}
      {bunIngredient && (
        <div className={cn('ml-8', styles.BurgerConstructorLastBun, 'BurgerConstructorDropTargetItem')}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunIngredient.name} (??????)`}
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
              ???????????????? ??????????
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
