import { combineReducers } from 'redux';

import currentFeedOrder from './current-feed-order';
import currentIngredient from './current-ingredient';
import currentOrder from './current-order';
import forgotPassword from './forgot-password';
import ingredients from './ingredients';
import selectedIngredients from './selected-ingredients';
import user from './user';
import { feedWS, profileOrdersWS } from './ws';

const rootReducer = combineReducers({
    currentFeedOrder,
    currentIngredient,
    currentOrder,
    forgotPassword,
    ingredients,
    selectedIngredients,
    user,
    feedWS,
    profileOrdersWS,
})

export default rootReducer;
