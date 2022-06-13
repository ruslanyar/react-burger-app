import { combineReducers } from 'redux';

import { constructorReducer as burger } from './constructorReducer';
import { ingredientsReducer as ingredients } from './ingredientsReducer';
import { orderDetailsReducer as orderDetails } from './orderDetailsReducer';
import { userReducer as user } from './userReducer';
import { wsReducer as ws } from './wsReducer';
import { wsAuthReducer as wsAuth } from './wsAuthReducer';

export const rootReducer = combineReducers({
  ingredients,
  burger,
  orderDetails,
  user,
  ws,
  wsAuth,
});
