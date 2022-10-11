import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppDispatch, AppThunk } from '../types';
import { TActions } from '../types/actions';
import { TState } from '../types/states';

export const useSelector: TypedUseSelectorHook<TState> = selectorHook;

// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
// export const useDispatch = () => dispatchHook<ThunkDispatch<TState, never, TActions>>();
export const useDispatch = () => dispatchHook<AppDispatch>();
