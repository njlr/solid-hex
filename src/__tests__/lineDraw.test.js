import * as Hex from '../index.js';

test('lineDraw works correctly', () => {
  expect(Hex.lineDraw(Hex.hex(0, 0), Hex.hex(1, -5))).toEqual([
    Hex.hex(0, 0), 
    Hex.hex(0, -1), 
    Hex.hex(0, -2), 
    Hex.hex(1, -3), 
    Hex.hex(1, -4), 
    Hex.hex(1, -5),
  ]);
});
