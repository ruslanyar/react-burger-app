import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from '../action-types';
import { TConstructorIngredientsState } from '../reducers/constructorReducer';
import { IIngredient } from '../types/data';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TConstructorIngredientsState;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: Array<IIngredient>;
}

export interface ISortIngredientsAction {
  readonly type: typeof SORT_INGREDIENTS;
  readonly payload: any;
}

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddIngredientAction
  | IDeleteIngredientAction
  | ISortIngredientsAction
  | IClearConstructorAction;

export const addIngredientAction = (
  payload: TConstructorIngredientsState
): IAddIngredientAction => {
  return { type: ADD_INGREDIENT, payload };
};

export const deleteIngredientAction = (
  payload: Array<IIngredient>
): IDeleteIngredientAction => {
  return { type: DELETE_INGREDIENT, payload };
};

export const sortIngredientsAction = (payload: any): ISortIngredientsAction => {
  return { type: SORT_INGREDIENTS, payload };
};

export const clearConstructorAction = () => {
  return { type: CLEAR_CONSTRUCTOR };
};
