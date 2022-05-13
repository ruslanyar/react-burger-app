import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED, 
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
        ingredients: [],
        failed: true,
        request: false,
      }

    default:
      return state;
  }
}
