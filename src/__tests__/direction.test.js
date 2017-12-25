import * as Hex from '../index.js';

test('direction works correctly', () => {
  expect(Hex.direction(2)).toEqual(Hex.hex(0, -1));
});
