import * as hex from './index.js';

test('round works correctly', () => {

  const a = hex.hex(0, 0);
  const b = hex.hex(1, -1);
  const c = hex.hex(0, -1);

  expect(hex.hex(10, -20) |> hex.lerp(hex.hex(0, 0), 0.5) |> hex.round).toEqual(hex.hex(5, -10));

  expect(hex.round(a)).toEqual(hex.round(a |> hex.lerp(b, 0.499)));
  expect(hex.round(b)).toEqual(hex.round(a |> hex.lerp(b, 0.501)));

  expect(hex.round(a)).toEqual(hex.round(hex.hex(a.q * 0.4 + b.q * 0.3 + c.q * 0.3, a.r * 0.4 + b.r * 0.3 + c.r * 0.3)));
  expect(hex.round(c)).toEqual(hex.round(hex.hex(a.q * 0.3 + b.q * 0.3 + c.q * 0.4, a.r * 0.3 + b.r * 0.3 + c.r * 0.4)));
});
