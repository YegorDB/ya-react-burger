import ingredients, { initialState } from './ingredients';
import {
  GET_INGREDIENTS_REQUEST_PENDING,
  GET_INGREDIENTS_REQUEST_FAILED,
  GET_INGREDIENTS_REQUEST_SUCCESS,
} from '../actions';
import { TIngredientsAction } from '../../types/actions';

describe('Ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredients(undefined, {} as TIngredientsAction)).toEqual(initialState);
  });

  it('should return ingredients pending', () => {
    const action = {
      type: GET_INGREDIENTS_REQUEST_PENDING,
    };

    expect(ingredients(undefined, action)).toEqual(initialState);
  });

  it('should return ingredients failed', () => {
    const action = {
      type: GET_INGREDIENTS_REQUEST_FAILED,
    };

    expect(ingredients(undefined, action)).toEqual(initialState);
  });

  it('should return ingredients success', () => {
    const items = [
      {
        _id: '123',
        name: '123',
        type: 'main',
        proteins: 123,
        fat: 123,
        carbohydrates: 123,
        calories: 123,
        price: 123,
        image: 'qwe',
        image_mobile: 'qwe',
        image_large: 'qwe',
        __v: 123,
      },
      {
        _id: '1234',
        name: '1234',
        type: 'main',
        proteins: 1234,
        fat: 1234,
        carbohydrates: 1234,
        calories: 1234,
        price: 1234,
        image: 'qwer',
        image_mobile: 'qwer',
        image_large: 'qwer',
        __v: 1234,
      },
    ];
    const action = {
      type: GET_INGREDIENTS_REQUEST_SUCCESS,
      items: items,
    };

    expect(ingredients(undefined, action)).toEqual({
      items: items,
    });
  });
});
