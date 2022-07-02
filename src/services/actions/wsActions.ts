import {
  WS_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from '../action-types';
import { IOrdersResponse } from '../types/data';

interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

interface IWsCloseAction {
  readonly type: typeof WS_CLOSE;
}

interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: IOrdersResponse;
}

export type TWsActions =
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetOrdersAction;

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
