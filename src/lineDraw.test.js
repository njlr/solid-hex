import * as hex from './index.js';

test('lineDraw works correctly', () => {
  expect(hex.hex(0, 0) |> hex.lineDraw(hex.hex(1, -5))).toEqual([
    hex.hex(0, 0), 
    hex.hex(0, -1), 
    hex.hex(0, -2), 
    hex.hex(1, -3), 
    hex.hex(1, -4), 
    hex.hex(1, -5),
  ]);
});
