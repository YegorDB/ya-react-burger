import cn from 'classnames';
import React from 'react';

import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

import data from '../../utils/data';

import styles from './App.module.css';

function App() {
  return (
    <div>
      <AppHeader />
      <main className={cn('ml-5 mr-5', styles.AppMain)}>
        <div className={styles.AppMainHalf}>
          <BurgerConstructor ingredients={data} />
        </div>
        <div className={styles.AppMainHalf}>
          <BurgerIngredients />
        </div>
      </main>
    </div>
  );
}

export default App;
