import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../action-types';
import { IIngredient } from '../types/data';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<IIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

export const getIngredientsSuccessAction = (
  payload: Array<IIngredient>
): IGetIngredientsSuccessAction => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload,
  };
};

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};
