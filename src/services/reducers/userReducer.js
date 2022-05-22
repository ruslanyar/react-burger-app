import { USER_REGISTRATION, USER_SIGN_IN, USER_SIGN_OUT } from '../actions/userActions';


const initialState = {
  isAuth: false,
  user: null,
}

export function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_SIGN_IN:
    case USER_REGISTRATION:
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
