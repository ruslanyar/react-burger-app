import {
  WS_AUTH_CLOSE,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_GET_AUTH_ORDERS,
} from '../action-types';
import { IOrdersResponse } from '../types/data';

interface IWsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

interface IWsAuthCloseAction {
  readonly type: typeof WS_AUTH_CLOSE;
}

interface IWsAuthConectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

interface IWsAuthConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}

interface IWsAuthConnectionClosedAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

interface IWsAuthGetOrdersAction {
  readonly type: typeof WS_GET_AUTH_ORDERS;
  readonly payload: IOrdersResponse;
}

export type TWsAuthActions = 
  | IWsAuthConectionSuccessAction
  | IWsAuthConnectionErrorAction
  | IWsAuthConnectionClosedAction
  | IWsAuthGetOrdersAction;

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
