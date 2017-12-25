import * as Hex from '../index.js';

test('distance works correctly', () => {
  expect(Hex.distance(Hex.hex(3, -7), Hex.hex(0, 0))).toEqual(7);
});
