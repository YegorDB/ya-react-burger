import currentFeedOrder, { initialState } from './current-feed-order';
import { SET_CURRENT_FEED_ORDER } from '../actions';

describe('Current feed order reducer', () => {
  it('should return the initial state', () => {
    expect(currentFeedOrder(undefined, {})).toEqual(initialState);
  });

  it('should return current feed order', () => {
    const feedOrder = {
      ingredients: [],
      _id: '123',
      status: 'done',
      number: 123,
      name: 'order',
      createdAt: '2022-01-01T00:00:00',
      updatedAt: '2022-01-01T00:00:00',
    };
    const action = {
      type: SET_CURRENT_FEED_ORDER,
      feedOrder: feedOrder,
    };

    expect(currentFeedOrder(undefined, action)).toEqual({
      feedOrder: feedOrder,
    });
  });
});
