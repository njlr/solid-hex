import * as Hex from '../index.js';

test('offsetFromCube works correctly', () => {
  expect(Hex.qOffsetFromCube(1, Hex.hex(1, 2))).toEqual(Hex.offsetCoord(1, 3));
  expect(Hex.qOffsetFromCube(-1, Hex.hex(1, 2))).toEqual(Hex.offsetCoord(1, 2));
});

test('offsetToCube works correctly', () => {
  expect(Hex.qOffsetToCube(1, Hex.offsetCoord(1, 3))).toEqual(Hex.hex(1, 2));
  expect(Hex.qOffsetToCube(-1, Hex.offsetCoord(1, 2))).toEqual(Hex.hex(1, 2));
});
