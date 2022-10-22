import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState, TApplicationActions } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = dispatchHook<ThunkDispatch<never, RootState, TApplicationActions>>;
