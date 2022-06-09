import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl, wsAuthUrl, wsActions) => {
  return (store) => {
    let socket = null;
    let authSocket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsAuthInit,
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        onAuthOpen,
        onAuthClose,
        onAuthError,
        onAuthMessage,
      } = wsActions;
      const { user } = getState().user;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };
      }

      if (type === wsAuthInit && user) {
        const accessToken = getCookie('token');
        authSocket = new WebSocket(`${wsAuthUrl}?token=${accessToken}`);
      }

      if (authSocket) {
        authSocket.onopen = (event) => {
          dispatch({ type: onAuthOpen, payload: event });
        };

        authSocket.onclose = (event) => {
          dispatch({ type: onAuthClose, payload: event });
        };

        authSocket.onerror = (event) => {
          dispatch({ type: onAuthError, payload: event });
        };

        authSocket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onAuthMessage, payload: restParsedData });
        }
      }

      next(action);
    };
  };
};
