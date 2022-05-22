import { combineReducers } from 'redux';

import { constructorReducer as burger } from './constructorReducer';
import { ingredientsReducer as ingredients } from './ingredientsReducer';
import { ingredientDetailsReducer as ingredientDetails } from './ingredientDetailsReducer';
import { orderDetailsReducer as orderDetails } from './orderDetailsReducer';
import { userReducer as user } from './userReducer';

export const rootReducer = combineReducers({
  ingredients,
  burger,
  ingredientDetails,
  orderDetails,
  user,
});
