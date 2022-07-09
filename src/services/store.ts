import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware';
import { rootReducer } from './reducers';

import { wsAuthUrl, wsUrl } from '../utils/constants';
import { wsOptions, wsAuthOptions } from './actions';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsOptions),
      socketMiddleware(wsAuthUrl, wsAuthOptions, true)
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
