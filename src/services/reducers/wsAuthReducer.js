import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_GET_AUTH_ORDERS,
} from '../action-types';

const initialState = {
  wsAuthConnected: false,
  userOrders: {},
};

export function wsAuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsAuthConnected: true,
      };

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsAuthConnected: false,
      };

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsAuthConnected: false,
      };

    case WS_GET_AUTH_ORDERS:
      return {
        ...state,
        userOrders: {...payload},
      }

    default:
      return state;
  }
}
