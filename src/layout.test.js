import * as hex from './index.js';

test('layout works correctly', () => {
  
  const h = hex.hex(3, 4, -7);

  const flat = hex.layout(hex.flatOrientation, hex.point(10, 15), hex.point(35, 71));
  expect(h |> hex.toPixel(flat) |> hex.toHex(flat) |> hex.round).toEqual(h);

  const pointy = hex.layout(hex.pointyOrientation, hex.point(10, 15), hex.point(35, 71));
  expect(h |> hex.toPixel(pointy) |> hex.toHex(pointy) |> hex.round).toEqual(h);
});
