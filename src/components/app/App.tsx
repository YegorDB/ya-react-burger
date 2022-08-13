import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

function App() {
  return (
    <div>
      <AppHeader />
      <BurgerConstructor />
      <BurgerIngredients />
    </div>
  );
}

export default App;
