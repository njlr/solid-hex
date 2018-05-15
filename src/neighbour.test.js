import * as hex from './index.js';

test('neighbor works correctly', () => {
  expect(hex.hex(1, -2) |> hex.neighbor(2)).toEqual(hex.hex(1, -3));
});
