import * as hex from './index.js';

test('offsetFromCube works correctly', () => {
  expect(hex.hex(1, 2) |> hex.qOffsetFromCube(1)).toEqual(hex.offsetCoord(1, 3));
  expect(hex.hex(1, 2) |> hex.qOffsetFromCube(-1)).toEqual(hex.offsetCoord(1, 2));
});

test('offsetToCube works correctly', () => {
  expect(hex.offsetCoord(1, 3) |> hex.qOffsetToCube(1)).toEqual(hex.hex(1, 2));
  expect(hex.offsetCoord(1, 2) |> hex.qOffsetToCube(-1)).toEqual(hex.hex(1, 2));
});
