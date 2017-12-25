import * as Hex from '../index.js';

test('add works correctly', () => {
  expect(Hex.hex(4, -10)).toEqual(Hex.add(Hex.hex(1, -3), Hex.hex(3, -7)));
});

test('subtract works correctly', () => {
  expect(Hex.hex(-2, 4)).toEqual(Hex.subtract(Hex.hex(1, -3), Hex.hex(3, -7)));
});
