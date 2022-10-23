import uuid from 'uuidv4';
jest.mock('uuidv4');

import selectedIngredients, { initialState } from './selected-ingredients';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
  CLEAR_CONSTRUCTOR,
} from '../actions';


describe('Selected ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(selectedIngredients(undefined, {})).toEqual(initialState);
  });

  it('should add bun ingredient to constructor', () => {
    const action = {
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      ingredientIsABun: true,
      ingredientId: '123'
    };

    expect(selectedIngredients(undefined, action)).toEqual({
      bunId: '123',
      itemsData: [],
    });
  });

  it('should add no bun ingredient to constructor', () => {
    const itemData = {
      id: '125',
      key: 'key125',
    };
    const state = {
      bunId: '123',
      itemsData: [
        {
          id: '124',
          key: 'key124',
        },
      ],
    };
    const action = {
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      ingredientIsABun: false,
      ingredientId: itemData.id
    };

    uuid.mockImplementation(() => itemData.key);

    expect(selectedIngredients(state, action)).toEqual({
      ...state,
      itemsData: [
        ...state.itemsData,
        itemData,
      ],
    });
  });

  it('should not remove bun ingredient from constructor', () => {
    const action = {
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      ingredientIsABun: true,
      ingredientId: '123'
    };

    expect(selectedIngredients(undefined, action)).toEqual(initialState);
  });

  it('should not remove not added ingredient from constructor', () => {
    const action = {
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      ingredientIsABun: false,
      ingredientId: '123'
    };

    expect(selectedIngredients(undefined, action)).toEqual(initialState);
  });

  it('should remove not bun ingredient from constructor', () => {
    const state = {
      bunId: '123',
      itemsData: [
        {
          id: '124',
          key: 'key124',
        },
      ],
    };

    const action = {
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      ingredientIsABun: false,
      ingredientId: '124'
    };

    expect(selectedIngredients(state, action)).toEqual({
      bunId: '123',
      itemsData: [],
    });
  });

  it('should change incredients order', () => {
    const state = {
      bunId: '123',
      itemsData: [
        {
          id: '124',
          key: 'key124',
        },
        {
          id: '125',
          key: 'key125',
        },
        {
          id: '126',
          key: 'key126',
        },
      ],
    };

    const action = {
      type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
      from: 0,
      to: 2
    };

    expect(selectedIngredients(state, action)).toEqual({
      bunId: '123',
      itemsData: [
        {
          id: '125',
          key: 'key125',
        },
        {
          id: '126',
          key: 'key126',
        },
        {
          id: '124',
          key: 'key124',
        },
      ],
    });
  });

  it('should change incredients order 2', () => {
    const state = {
      bunId: '123',
      itemsData: [
        {
          id: '124',
          key: 'key124',
        },
        {
          id: '125',
          key: 'key125',
        },
        {
          id: '126',
          key: 'key126',
        },
      ],
    };

    const action = {
      type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
      from: 1,
      to: 0
    };

    expect(selectedIngredients(state, action)).toEqual({
      bunId: '123',
      itemsData: [
        {
          id: '125',
          key: 'key125',
        },
        {
          id: '124',
          key: 'key124',
        },
        {
          id: '126',
          key: 'key126',
        },
      ],
    });
  });

  it('should clear constructor', () => {
    const state = {
      bunId: '123',
      itemsData: [
        {
          id: '124',
          key: 'key124',
        },
        {
          id: '125',
          key: 'key125',
        },
        {
          id: '126',
          key: 'key126',
        },
      ],
    };

    const action = {
      type: CLEAR_CONSTRUCTOR,
    };

    expect(selectedIngredients(state, action)).toEqual(initialState);
  });
});
