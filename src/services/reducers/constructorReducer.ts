import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
} from '../action-types/constructorActionTypes';
import { TConstructorActions } from '../actions';
import { IIngredient } from '../types/data';

type TConstructorState = {
  ingredients: {
    bun: Array<IIngredient>;
    topings: Array<IIngredient>;
  };
  isEmpty: boolean;
};

const initialState: TConstructorState = {
  ingredients: {
    bun: [],
    topings: [],
  },
  isEmpty: true,
};

export function constructorReducer(
  state = initialState,
  action: TConstructorActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload,
        isEmpty: false,
      };

    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          topings: action.payload,
        },
        isEmpty:
          state.ingredients.bun.length || state.ingredients.topings.length
            ? false
            : true,
      };

    case SORT_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          topings: action.payload,
        },
      };

    case CLEAR_CONSTRUCTOR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
