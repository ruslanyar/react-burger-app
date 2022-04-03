import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED 
} from '../actions/ingredientsActions';


const initialState = {
  ingredients: [],
  request: false,
  failed: false,
}

export const ingredientsReducer = (state = initialState, { type, ingredients }) => {
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
        ingredients,
        request: false,
      }

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        failed: true,
        request: false,
      }

    default:
      return state;
  }
}
