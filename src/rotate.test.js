import * as hex from './index.js';

test('rotateLeft works correctly', () => {
  expect(hex.rotateLeft(hex.hex(1, -3))).toEqual(hex.hex(-2, -1));
});

test('rotateRight works correctly', () => {
  expect(hex.rotateRight(hex.hex(1, -3))).toEqual(hex.hex(3, -2));
});
