import * as hex from './index.js';

test('add works correctly', () => {
  expect(hex.hex(4, -10)).toEqual(hex.hex(1, -3) |> hex.add(hex.hex(3, -7)));
});

test('subtract works correctly', () => {
  expect(hex.hex(-2, 4)).toEqual(hex.hex(1, -3) |> hex.subtract(hex.hex(3, -7)));
});
