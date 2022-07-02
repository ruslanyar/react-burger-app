import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl, wsActions, isAuth = false) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsClose,
      } = wsActions;

      if (type === wsInit) {
        if (!isAuth) {
          socket = new WebSocket(wsUrl);
        } else {
          const accessToken = getCookie('token');
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        };
      };

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

        if (type === wsClose) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
