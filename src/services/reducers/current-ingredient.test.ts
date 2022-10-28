import currentIngredient, { initialState } from './current-ingredient';
import { SET_CURRENT_INGREDIENT } from '../actions';
import { TCurrentIngredientAction } from '../../types/actions';

describe('Current ingredient reducer', () => {
  it('should return the initial state', () => {
    expect(currentIngredient(undefined, {} as TCurrentIngredientAction)).toEqual(initialState);
  });

  it('should return current ingredient', () => {
    const ingredient = {
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
    };
    const action = {
      type: SET_CURRENT_INGREDIENT,
      ingredient: ingredient,
    };

    expect(currentIngredient(undefined, action)).toEqual({
      ingredient: ingredient,
    });
  });
});
