import * as Hex from '../index.js';

test('neighbor works correctly', () => {
  expect(Hex.neighbor(Hex.hex(1, -2), 2)).toEqual(Hex.hex(1, -3));
});
