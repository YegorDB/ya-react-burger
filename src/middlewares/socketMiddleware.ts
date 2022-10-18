import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch } from '../types';
import type { TWSActionTypes, TWSActions as AppActions } from '../types/actions';
import type { TState as RootState } from '../types/states';

export const socketMiddleware = (
  wsUrl: string,
  wsActionTypes: TWSActionTypes,
  authRequired: boolean = false,
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch, getState } = store;
      const { type } = action;

      if (type === wsActionTypes.wsInit) {
        if (socket) {
          socket.close();
        }

        if (authRequired) {
          const { user } = getState();
          if (user.userLoaded) {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
              const token = accessToken.split('Bearer ')[1];
              socket = new WebSocket(`${wsUrl}?token=${token}`);
            } else {
              console.log('Fail to establish ws connection. Access token missed.');
            }
          } else {
            console.log('Fail to establish ws connection. Authorization required.');
          }
        } else {
          socket = new WebSocket(wsUrl);
        }
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: wsActionTypes.onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: wsActionTypes.onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: wsActionTypes.onMessage, payload: data });
        };

        socket.onclose = event => {
          dispatch({ type: wsActionTypes.onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
