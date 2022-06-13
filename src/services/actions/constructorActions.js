import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from '../action-types/constructorActionTypes';

export const addIngredient = (payload) => {
  return { type: ADD_INGREDIENT, payload };
};

export const deleteIngredient = (payload) => {
  return { type: DELETE_INGREDIENT, payload };
};

export const sortIngredients = (payload) => {
  return { type: SORT_INGREDIENTS, payload };
};

export const clearConstructor = () => {
  return { type: CLEAR_CONSTRUCTOR };
};
