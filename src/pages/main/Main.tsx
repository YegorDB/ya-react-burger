import React, { FC } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import styles from './Main.module.css';

export const MainPage: FC = () => {
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
