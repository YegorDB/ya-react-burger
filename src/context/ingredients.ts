import React from 'react';

import { Ingredient, SelectedIngredientsContextValue } from '../types/ingredient'

export const IngredientsContext = React.createContext(new Array<Ingredient>());

const selectedIngredientsContextValue: SelectedIngredientsContextValue = {
  selectedIngredientsState: {bunId: null, otherIds: []},
  selectedIngredientsDispatch: () => {},
};

export const SelectedIngredientsContext = React.createContext(selectedIngredientsContextValue);
