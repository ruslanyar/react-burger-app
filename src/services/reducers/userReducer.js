import { USER_REGISTRATION, USER_SIGN_IN, USER_SIGN_OUT, USER_UPDATE } from '../actions/userActions';


const initialState = {
  isAuth: false,
  user: null,
}

export function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_SIGN_IN:
    case USER_REGISTRATION:
    case USER_UPDATE:
      return {
        ...state,
        isAuth: true,
        user: payload,
      };

    case USER_SIGN_OUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      }

    default:
      return state;
  }
}
