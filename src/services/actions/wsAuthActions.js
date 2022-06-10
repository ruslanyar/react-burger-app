import {
  WS_AUTH_CLOSE,
  WS_AUTH_CONNECTION_START,
} from '../action-types';

export const wsAuthConnectionStart = () => {
  return {
    type: WS_AUTH_CONNECTION_START
  };
};

export const wsAuthClose = () => {
  return {
    type: WS_AUTH_CLOSE
  };
};
