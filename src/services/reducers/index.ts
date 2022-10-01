import { combineReducers } from 'redux';

import currentIngredient from './current-ingredient';
import currentOrder from './current-order';
import forgotPassword from './forgot-password';
import ingredients from './ingredients';
import selectedIngredients from './selected-ingredients';
import user from './user';

const rootReducer = combineReducers({
    currentIngredient,
    currentOrder,
    forgotPassword,
    ingredients,
    selectedIngredients,
    user,
})

export default rootReducer;
