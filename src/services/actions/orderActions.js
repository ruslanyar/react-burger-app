import {
  CLOSE_ORDER_DETAILS,
  IS_EMPTY,
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
} from '../action-types';

export const sendOrderRequest = () => {
  return {
    type: SEND_ORDER_REQUEST,
  };
};

export const sendOrderSuccess = (payload) => {
  return {
    type: SEND_ORDER_SUCCESS,
    payload,
  };
};

export const sendOrderFailed = () => {
  return {
    type: SEND_ORDER_FAILED,
  };
};

export const isOrderEmpty = () => {
  return {
    type: IS_EMPTY,
  };
};

export const closeOrderDetails = () => {
  return {
    type: CLOSE_ORDER_DETAILS,
  };
};
