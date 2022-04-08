import { BUN } from '../../utils/constants';
import { ADD_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructorActions';

const initialState = {
  ingredients: {
    bun: [],
    other: [],
  },
  isEmpty: true,
}

export function constructorReducer(state = initialState, { type, ingredient }) {
  switch (type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredient.type === BUN ? ingredient.type : 'other']: ingredient.type === BUN
            ? [ingredient]
            : [
                ...state.ingredients.other,
                ingredient,
              ]
        },
        isEmpty: false,
      }

    case DELETE_INGREDIENT: 
      return {
        ...state.ingredients,
        ingredients: {
          ...state.ingredients,
          other: state.ingredients.other.filter(i => i.keyId !== ingredient.keyId)
        },
        isEmpty: state.ingredients.bun.length || state.ingredients.other.length
          ? false
          : true
      }

    default:
      return state;
  }
}
