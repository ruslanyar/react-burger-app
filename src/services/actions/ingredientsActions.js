import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../action-types';

export const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

export const getIngredientsSuccess = (payload) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload,
  };
};

export const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};
