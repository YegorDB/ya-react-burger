import React, {useEffect} from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';

import BurgerConstructor from '../../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../burger-ingredients/BurgerIngredients';
import {
  // ADD_INGREDIENT_TO_CONSTRUCTOR,
  getIngredients
} from '../../../services/actions';
// import order from '../../../utils/order-data';

import styles from './Main.module.css';

export function MainPage() {
  const dispatch = useDispatch();

  useEffect(()=> {
    // @ts-ignore
    dispatch(getIngredients());

    // dispatch({
    //   type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    //   ingredientIsABun: true,
    //   ingredientId: order.bunId
    // });
    // for (const ingredientId of order.otherIds) {
    //   dispatch({
    //     type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    //     ingredientIsABun: false,
    //     ingredientId: ingredientId
    //   });
    // }
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.Main}>
        <div className={styles.MainHalf}>
          <BurgerIngredients />
        </div>
        <div className={styles.MainHalf}>
          <BurgerConstructor />
        </div>
      </main>
    </DndProvider>
  );
}
