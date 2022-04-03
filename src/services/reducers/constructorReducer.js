import { BUN } from '../../utils/constants';
import { ADD_INGREDIENT } from '../actions/constructorActions';

const initialState = {
  ingredients: {
    bun: [],
    main: [],
    sauce: [],
  },
  isEmpty: true,
}

export function constructorReducer(state = initialState, { type, ingredient, uuid }) {
  switch (type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredient.type]: ingredient.type === BUN
            ? [ingredient]
            : [
              ...state.ingredients[ingredient.type],
              ingredient,
            ]
        },
        isEmpty: false,
      }
      
  
    default:
      return state;
  }
}
