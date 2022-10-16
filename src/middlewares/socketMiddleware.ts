import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch } from '../types';
import type { TWSAction as AppActions } from '../types/actions';
import type { TState as RootState } from '../types/states';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
      let dataGetted = false;

      return next => (action: AppActions) => {
        const { dispatch } = store;
        const { type } = action;

        if (type === 'WS_CONNECTION_START') {
          socket = new WebSocket(wsUrl);
        }
        if (socket) {
          socket.onopen = event => {
            dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
          };

          socket.onerror = event => {
            dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
          };

          socket.onmessage = event => {
            const { data } = event;
            dispatch({ type: 'WS_GET_MESSAGE', payload: data });
          };

          socket.onclose = event => {
            dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
          };
        }

        next(action);
      };
    }) as Middleware;
};
