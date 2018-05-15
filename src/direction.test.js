import * as hex from './index.js';

test('direction works correctly', () => {
  expect(hex.direction(2)).toEqual(hex.hex(0, -1));
});
