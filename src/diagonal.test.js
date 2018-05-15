import * as hex from './index.js';

test('diagonalNeighbor works correctly', () => {
  expect(hex.hex(1, -2) |> hex.diagonalNeighbor(3)).toEqual(hex.hex(-1, -1));
});
