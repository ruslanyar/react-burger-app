import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../action-types';
import { TIngredientsActions } from '../actions';
import { IIngredient } from '../types/data';

type TIngredientsState = {
  ingredients: IIngredient[];
  request: boolean;
  failed: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  request: false,
  failed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        request: false,
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: [],
        failed: true,
        request: false,
      };

    default:
      return state;
  }
};
