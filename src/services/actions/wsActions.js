import {
  WS_CLOSE,
  WS_CONNECTION_START,
} from '../action-types';

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsClose = () => {
  return {
    type: WS_CLOSE
  };
};
