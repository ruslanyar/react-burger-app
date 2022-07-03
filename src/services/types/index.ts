import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';

import { store } from '../store';
import {
  TConstructorActions,
  TIngredientsActions,
  TOrderActions,
  TUserActions,
  TWsActions,
  TWsAuthActions,
} from '../actions';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TWsActions
  | TWsAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, undefined, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
