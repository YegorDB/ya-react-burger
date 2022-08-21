import React from 'react';

import { SelectedIngredientsState } from '../types/ingredient'

export const IngredientsContext = React.createContext([]);

const selectedIngredientsContextValue: {
  selectedIngredientsState: SelectedIngredientsState,
  selectedIngredientsDispatch: Function,
} = {
  selectedIngredientsState: {bunId: null, otherIds: []},
  selectedIngredientsDispatch: () => {},
};

export const SelectedIngredientsContext = React.createContext(selectedIngredientsContextValue);
