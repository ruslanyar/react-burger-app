import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';

import { store } from '../store';
import { rootReducer } from '../reducers';
import {
  TConstructorActions,
  TIngredientsActions,
  TOrderActions,
  TUserActions,
  TWsActions,
  TWsAuthActions,
} from '../actions';

export type TRootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TWsActions
  | TWsAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, TRootState, undefined, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
