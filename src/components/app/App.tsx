import React, {useState, useReducer, useEffect} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import { API_ROOT } from '../../consts/api';
import { IngredientsContext, SelectedIngredientsContext } from '../../context/ingredients';

import rootReducer from '../../services/reducers';

import {
  Ingredient, SelectedIngredientsState, SelectedIngredientsAction
} from '../../types/ingredient';
import { checkResponse, handleResponse, handleResponseError } from '../../utils/fetch';
// import ingredients from '../../utils/ingredients-data';
import order from '../../utils/order-data';

import styles from './App.module.css';

const store = createStore(rootReducer);

const selectedIngredientsInitialState = {bunId: null, otherIds: []};

function selectedIngredientsReducer(
  state: SelectedIngredientsState,
  action: SelectedIngredientsAction,
) {
  switch (action.type) {
    case 'add':
      if (action.ingredientIsABun) {
        if (state.bunId) {
          console.log('There is a bun ingredient in order already.');
          return state;
        }
        return {
          ...state,
          bunId: action.ingredientId,
        };
      }
      return {
        ...state,
        otherIds: [...state.otherIds, action.ingredientId],
      };
    case 'remove':
      if (action.ingredientIsABun) {
        if (state.bunId !== action.ingredientId) {
          console.log('Wrong bun ingredient id.');
          return state;
        }
        return {
          ...state,
          bunId: null,
        };
      }
      const index = state.otherIds.indexOf(action.ingredientId);
      if (index === -1) {
        console.log(`There is no an ingredient witn id ${action.ingredientId} in order.`);
        return state;
      }
      return {
        ...state,
        otherIds: state.otherIds.splice(index, 1),
      };
    case 'clear':
      return selectedIngredientsInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [ingredients, setIngredients] = useState(new Array<Ingredient>());
  const [selectedIngredientsState, selectedIngredientsDispatch] = useReducer(
    selectedIngredientsReducer, selectedIngredientsInitialState);

  useEffect(() => {
    selectedIngredientsDispatch({ type: 'add', ingredientIsABun: true, ingredientId: order.bunId });
    for (const ingredientId of order.otherIds) {
      selectedIngredientsDispatch({ type: 'add', ingredientIsABun: false, ingredientId: ingredientId });
    }
  }, []);

  useEffect(() => {
    fetch(`${API_ROOT}/ingredients`)
    .then(checkResponse)
    .then(handleResponse<{success: boolean, data: Ingredient[]}>(res => setIngredients(res.data)))
    .catch(handleResponseError('Get ingredients'));
  }, []);

  return (
    <Provider store={store}>
      <IngredientsContext.Provider value={ingredients}>
        <SelectedIngredientsContext.Provider value={{
          selectedIngredientsState, selectedIngredientsDispatch
        }}>
          <AppHeader />
          <main className={styles.AppMain}>
            <div className={styles.AppMainHalf}>
              <BurgerIngredients />
            </div>
            <div className={styles.AppMainHalf}>
              <BurgerConstructor />
            </div>
          </main>
        </SelectedIngredientsContext.Provider>
      </IngredientsContext.Provider>
    </Provider>
  );
}

export default App;
