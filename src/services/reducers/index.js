import { combineReducers } from 'redux';

import { constructorReducer } from './constructorReducer';
import { ingredientsReducer } from './ingredientsReducer';
import { ingredientDetailsReducer } from './ingredientDetailsReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
  burger: constructorReducer,
  ingredients: ingredientsReducer,
  details: ingredientDetailsReducer,
  order: orderReducer,
});
