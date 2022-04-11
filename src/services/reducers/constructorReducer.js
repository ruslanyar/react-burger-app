import { ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENTS } from '../actions/constructorActions';

const initialState = {
  ingredients: {
    bun: [],
    other: [],
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
          other: payload,
        },
        isEmpty: state.ingredients.bun.length || state.ingredients.other.length
          ? false
          : true
      }

    case SORT_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          other: payload,
        }
      }

    default:
      return state;
  }
}
