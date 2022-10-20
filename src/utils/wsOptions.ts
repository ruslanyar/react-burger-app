import { connectionClosed, connectionError, connectionSuccess, getOrders, wsClose, wsStart } from '../services/slices/wsSlice';

export interface IWsOptions {
  wsInit: typeof wsStart;
  onOpen: typeof connectionSuccess;
  onClose: typeof connectionClosed;
  onError: typeof connectionError;
  onMessage: typeof getOrders;
  wsClose: typeof wsClose;
}

export const wsOptions: IWsOptions = {
  wsInit: wsStart,
  onOpen: connectionSuccess,
  onClose: connectionClosed,
  onError: connectionError,
  onMessage: getOrders,
  wsClose: wsClose,
};
