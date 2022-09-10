import { combineReducers } from 'redux';

import currentIngredient from './current-ingredient';
import currentOrder from './current-order';
import ingredients from './ingredients';
import selectedIngredients from './selected-ingredients';

const rootReducer = combineReducers({
    currentIngredient,
    currentOrder,
    ingredients,
    selectedIngredients,
})

export default rootReducer;
