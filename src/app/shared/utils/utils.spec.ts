import { pluck, range } from './utils';

describe('utils', () => {
  describe('range', () => {
    it('should return an array of numbers from start to end', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
      expect(range(2, 7)).toEqual([2, 3, 4, 5, 6]);
      expect(range(-2, 3)).toEqual([-2, -1, 0, 1, 2]);
      expect(range(-5, 0)).toEqual([-5, -4, -3, -2, -1]);
    });

    it('should return an empty array if start is equal to end', () => {
      expect(range(0, 0)).toEqual([]);
    });
  })

  describe('pluck', () => {
    it('should return an array of values for the given field', () => {
      const elements = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Doe' },
      ];
      expect(pluck(elements, 'name')).toEqual(['John', 'Jane', 'Doe']);
      expect(pluck(elements, 'id')).toEqual([1, 2, 3]);
    });

    it('should return an empty array if the field does not exist', () => {
      const elements = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Doe' },
      ];
      expect(pluck(elements, 'age')).toEqual([undefined, undefined, undefined]);
    });
  })
});
