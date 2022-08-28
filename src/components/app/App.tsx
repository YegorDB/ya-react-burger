import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';

import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import { ADD_INGREDIENT_TO_CONSTRUCTOR, getIngredients } from '../../services/actions';
// import ingredients from '../../utils/ingredients-data';
import order from '../../utils/order-data';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    // @ts-ignore
    dispatch(getIngredients());

    dispatch({
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      ingredientIsABun: true,
      ingredientId: order.bunId
    });
    for (const ingredientId of order.otherIds) {
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        ingredientIsABun: false,
        ingredientId:ingredientId
      });
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.AppMain}>
        <div className={styles.AppMainHalf}>
          <BurgerIngredients />
        </div>
        <div className={styles.AppMainHalf}>
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}

export default App;
