import {
  SET_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from '../actions/ingredientDetailsActions';

const initialState = {
  details: {},
  isOpen: false,
}

export const ingredientDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INGREDIENT_DETAILS:
      return {
        ...state,
        details: payload,
        isOpen: true,
      }

      case CLOSE_INGREDIENT_DETAILS:
        return {
          ...state,
          details: {},
          isOpen: false,
        };

    default:
      return state;
  }
}
