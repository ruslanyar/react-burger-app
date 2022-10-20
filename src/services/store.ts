import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';

import { wsAuthUrl, wsUrl } from '../utils/constants';
import { wsAuthOptions } from '../utils/wsAuthOptions';
import { wsOptions } from '../utils/wsOptions';
import { socketMiddleware } from './middleware';

import constructorSlice from './slices/constructorSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import wsAuthSlice from './slices/wsAuthSlice';
import wsSlice from './slices/wsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burger: constructorSlice,
  user: userSlice,
  order: orderSlice,
  ws: wsSlice,
  wsAuth: wsAuthSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsOptions),
      socketMiddleware(wsAuthUrl, wsAuthOptions, true)
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
