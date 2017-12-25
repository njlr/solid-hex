import * as Hex from '../index.js';

test('round works correctly', () => {
  const a = Hex.hex(0, 0);
  const b = Hex.hex(1, -1);
  const c = Hex.hex(0, -1);

  expect(Hex.round(Hex.lerp(Hex.hex(0, 0), Hex.hex(10, -20), 0.5))).toEqual(Hex.hex(5, -10));

  expect(Hex.round(a)).toEqual(Hex.round(Hex.lerp(a, b, 0.499)));
  expect(Hex.round(b)).toEqual(Hex.round(Hex.lerp(a, b, 0.501)));

  expect(Hex.round(a)).toEqual(Hex.round(Hex.hex(a.q * 0.4 + b.q * 0.3 + c.q * 0.3, a.r * 0.4 + b.r * 0.3 + c.r * 0.3)));
  expect(Hex.round(c)).toEqual(Hex.round(Hex.hex(a.q * 0.3 + b.q * 0.3 + c.q * 0.4, a.r * 0.3 + b.r * 0.3 + c.r * 0.4)));
});
