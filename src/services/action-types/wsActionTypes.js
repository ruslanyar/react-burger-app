export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_SUCCESS ='WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';

export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_GET_AUTH_ORDERS = 'GET_AUTH_ORDERS';
// export const SEND_ORDER = 'SEND_ORDER';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
  wsAuthInit: WS_AUTH_CONNECTION_START,
  onAuthOpen: WS_AUTH_CONNECTION_SUCCESS,
  onAuthClose: WS_AUTH_CONNECTION_CLOSED,
  onAuthError: WS_AUTH_CONNECTION_ERROR,
  onAuthMessage: WS_GET_AUTH_ORDERS,
};