import * as hex from './index.js';

test('coordinates work correctly', () => {
  const a = hex.hex(3, 4);
  const b = hex.offsetCoord(1, -3);
  expect(a |> hex.qOffsetFromCube(1) |> hex.qOffsetToCube(1)).toEqual(a);
  expect(b |> hex.qOffsetToCube(1) |> hex.qOffsetFromCube(1)).toEqual(b);
  expect(a |> hex.qOffsetFromCube(-1) |> hex.qOffsetToCube(-1)).toEqual(a);
  expect(b |> hex.qOffsetToCube(-1) |> hex.qOffsetFromCube(-1)).toEqual(b);
  expect(a |> hex.rOffsetFromCube(1) |> hex.rOffsetToCube(1)).toEqual(a);
  expect(b |> hex.rOffsetToCube(1) |> hex.rOffsetFromCube(1)).toEqual(b);
  expect(a |> hex.rOffsetFromCube(-1) |> hex.rOffsetToCube(-1)).toEqual(a);
  expect(b |> hex.rOffsetToCube(-1) |> hex.rOffsetFromCube(-1)).toEqual(b);
});
