import { combineReducers } from 'redux';

import currentIngredient from './current-ingredient';
import currentOrder from './current-order';
import forgotPassword from './forgot-password';
import ingredients from './ingredients';
import selectedIngredients from './selected-ingredients';
import user from './user';
import { feedWS } from './ws';

const rootReducer = combineReducers({
    currentIngredient,
    currentOrder,
    forgotPassword,
    ingredients,
    selectedIngredients,
    user,
    feedWS,
})

export default rootReducer;
