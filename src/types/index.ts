import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import { TActions } from './actions';
import { TState } from './states';

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TState, TActions>
>;

export type AppDispatch = Dispatch<TActions>;
