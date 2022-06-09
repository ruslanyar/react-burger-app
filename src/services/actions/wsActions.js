import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
} from '../action-types';

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsAuthConnectionStart = () => {
  return {
    type: WS_AUTH_CONNECTION_START
  };
};

export const wsAuthConnectionSuccess = () => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS
  };
};

export const wsAuthConnectionError = () => {
  return {
    type: WS_AUTH_CONNECTION_ERROR
  };
};

export const wsAuthConnectionClosed = () => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED
  };
};
