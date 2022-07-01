import {
  WS_CLOSE,
  WS_CONNECTION_START,
} from '../action-types';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsCloseAction {
  readonly type: typeof WS_CLOSE;
}

export const wsConnectionStartAction = (): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsCloseAction = (): IWsCloseAction => {
  return {
    type: WS_CLOSE
  };
};
