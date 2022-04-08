import { BUN } from '../../utils/constants';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED, 
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
} from '../actions/ingredientsActions';


const initialState = {
  ingredients: [],
  request: false,
  failed: false,
}

export const ingredientsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
      }

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: payload,
        request: false,
      }

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        failed: true,
        request: false,
      }

    case INCREASE_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map(i => {
          if (i._id === payload._id && payload.type === BUN && i.count > 0) return i;
          if (i._id !== payload._id && payload.type === BUN && i.count > 0) return { ...i, count: i.count - 1 };
          if (i._id === payload._id) return { ...i, count: i.count + 1 };
          return i;
        }),
      }

    case DECREASE_INGREDIENT_COUNT: 
      return {
        ...state,
        ingredients: state.ingredients.map(i => {
          if (i._id === payload._id) return {...i, count: i.count - 1};
          return i;
        }),
      }

    default:
      return state;
  }
}
