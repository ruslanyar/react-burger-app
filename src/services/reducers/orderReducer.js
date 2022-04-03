import {
  IS_EMPTY,
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
} from '../actions/orderActions';

const initialState = {
  order: {},
  request: false,
  failed: false,
  isEmpty: false,
}

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        isEmpty: false,
      }

    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        order: payload,
        request: false,
        isEmpty: false,
      }

    case SEND_ORDER_FAILED:
      return {
        ...state,
        failed: true,
        request: false,
      }

    case IS_EMPTY:
      return {
        ...state,
        isEmpty: true,
      }

    default:
      return state;
  }
}
