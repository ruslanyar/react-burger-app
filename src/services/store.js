import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware';
import { rootReducer } from './reducers';

import { wsAuthUrl, wsUrl } from '../utils/constants';
import { wsActions, wsAuthActions } from '../utils/ws';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsAuthUrl, wsAuthActions, true)
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
