import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { socketMiddleware } from '../middleware';
import { rootReducer } from '../reducers';

import { wsAuthUrl, wsUrl } from '../../utils/constants';
import { wsActions } from '../action-types';

const composeEnhancer =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancer(applyMiddleware(socketMiddleware(wsUrl, wsAuthUrl, wsActions), thunk));

export const store = createStore(rootReducer, enhancer);
