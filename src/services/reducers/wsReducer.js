import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_AUTH_ORDERS,
  WS_GET_ORDERS,
} from '../action-types';

const initialState = {
  wsConnected: false,
  wsAuthConnected: false,
  orders: [],
  userOrders: [],
};

export function wsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders: [...payload],
      };

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
        userOrders: [...payload],
      }

    default:
      return state;
  }
}
