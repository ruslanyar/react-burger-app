import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from '../action-types';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: string;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: number;
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
  | IDeleteIngredientAction
  | IClearConstructorAction;

export const addIngredientAction = (payload: string): IAddIngredientAction => {
  return { type: ADD_INGREDIENT, payload };
};

export const deleteIngredientAction = (
  payload: number
): IDeleteIngredientAction => {
  return { type: DELETE_INGREDIENT, payload };
};

export const sortIngredientsAction = (payload: any): ISortIngredientsAction => {
  return { type: SORT_INGREDIENTS, payload };
};

export const clearConstructorAction = () => {
  return { type: CLEAR_CONSTRUCTOR };
};
