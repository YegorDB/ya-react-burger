import cn from 'classnames';
import React from 'react';

import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

// import ingredients from '../../utils/ingredients-data';
import order from '../../utils/order-data';

import styles from './App.module.css';

const API_ROOT = 'https://norma.nomoreparties.space/api';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_ROOT}/ingredients`)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setIngredients(res.data);
      } else {
        console.log('Get ingredients without success response', res);
      }
    })
    .catch(err => console.log('Get ingredients error', err));
  }, []);

  return (
    <div>
      <AppHeader />
      <main className={cn('ml-5 mr-5', styles.AppMain)}>
        <div className={styles.AppMainHalf}>
          <BurgerConstructor ingredients={ingredients} />
        </div>
        <div className={styles.AppMainHalf}>
          <BurgerIngredients ingredients={ingredients} bunId={order.bunId} otherIds={order.otherIds}/>
        </div>
      </main>
    </div>
  );
}

export default App;
