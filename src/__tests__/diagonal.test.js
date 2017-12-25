import * as Hex from '../index.js';

test('diagonalNeighbor works correctly', () => {
  expect(Hex.diagonalNeighbor(Hex.hex(1, -2), 3)).toEqual(Hex.hex(-1, -1));
});
