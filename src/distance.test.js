import * as hex from './index.js';

test('distance works correctly', () => {
  expect(hex.hex(3, -7) |> hex.distance(hex.hex(0, 0))).toEqual(7);
});
