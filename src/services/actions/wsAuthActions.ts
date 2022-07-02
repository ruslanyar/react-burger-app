import {
  WS_AUTH_CLOSE,
  WS_AUTH_CONNECTION_START,
} from '../action-types';

export interface IWsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

export interface IWsAuthCloseAction {
  readonly type: typeof WS_AUTH_CLOSE;
}

export type TWsAuthActions = IWsAuthConnectionStartAction | IWsAuthCloseAction;

export const wsAuthConnectionStartAction = (): IWsAuthConnectionStartAction => {
  return {
    type: WS_AUTH_CONNECTION_START
  };
};

export const wsAuthCloseAction = (): IWsAuthCloseAction => {
  return {
    type: WS_AUTH_CLOSE
  };
};
