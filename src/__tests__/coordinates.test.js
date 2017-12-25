import * as Hex from '../index.js';

test('coordinates work correctly', () => {
  const a = Hex.hex(3, 4);
  const b = Hex.offsetCoord(1, -3);
  expect(Hex.qOffsetToCube(1, Hex.qOffsetFromCube(1, a))).toEqual(a);
  expect(Hex.qOffsetFromCube(1, Hex.qOffsetToCube(1, b))).toEqual(b);
  expect(Hex.qOffsetToCube(-1, Hex.qOffsetFromCube(-1, a))).toEqual(a);
  expect(Hex.qOffsetFromCube(-1, Hex.qOffsetToCube(-1, b))).toEqual(b);
  expect(Hex.rOffsetToCube(1, Hex.rOffsetFromCube(1, a))).toEqual(a);
  expect(Hex.rOffsetFromCube(1, Hex.rOffsetToCube(1, b))).toEqual(b);
  expect(Hex.rOffsetToCube(-1, Hex.rOffsetFromCube(-1, a))).toEqual(a);
  expect(Hex.rOffsetFromCube(-1, Hex.rOffsetToCube(-1, b))).toEqual(b);
});
