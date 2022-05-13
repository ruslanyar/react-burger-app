import { 
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  CLEAR_CONSTRUCTOR } from '../actions/constructorActions';

const initialState = {
  ingredients: {
    bun: [],
    topings: [],
  },
  isEmpty: true,
}

export function constructorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: payload,
        isEmpty: false,
      }

    case DELETE_INGREDIENT: 
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          topings: payload,
        },
        isEmpty: state.ingredients.bun.length || state.ingredients.topings.length
          ? false
          : true
      }

    case SORT_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          topings: payload,
        }
      }

    case CLEAR_CONSTRUCTOR:
      return {
        ...initialState,
      }

    default:
      return state;
  }
}
