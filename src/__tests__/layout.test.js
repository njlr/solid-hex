import * as Hex from '../index.js';

test('layout works correctly', () => {
  
  const h = Hex.hex(3, 4, -7);

  const flat = Hex.layout(Hex.flatOrientation, Hex.point(10, 15), Hex.point(35, 71));
  expect(Hex.round(Hex.toHex(flat, Hex.toPixel(flat, h)))).toEqual(h);

  const pointy = Hex.layout(Hex.pointyOrientation, Hex.point(10, 15), Hex.point(35, 71));
  expect(Hex.round(Hex.toHex(pointy, Hex.toPixel(pointy, h)))).toEqual(h);
});
