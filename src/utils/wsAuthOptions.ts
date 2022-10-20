import { authConnectionClosed, authConnectionError, authConnectionSuccess, getAuthOrders, wsAuthClose, wsAuthStart } from '../services/slices/wsAuthSlice';

export interface IWsAuthOptions {
  wsInit: typeof wsAuthStart;
  onOpen: typeof authConnectionSuccess;
  onClose: typeof authConnectionClosed;
  onError: typeof authConnectionError;
  onMessage: typeof getAuthOrders;
  wsClose: typeof wsAuthClose;
};

export const wsAuthOptions: IWsAuthOptions = {
  wsInit: wsAuthStart,
  onOpen: authConnectionSuccess,
  onClose: authConnectionClosed,
  onError: authConnectionError,
  onMessage: getAuthOrders,
  wsClose: wsAuthClose,
};
