import * as Hex from '../index.js';

test('rotateLeft works correctly', () => {
  expect(Hex.rotateLeft(Hex.hex(1, -3))).toEqual(Hex.hex(-2, -1));
});

test('rotateRight works correctly', () => {
  expect(Hex.rotateRight(Hex.hex(1, -3))).toEqual(Hex.hex(3, -2));
});
