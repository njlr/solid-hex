import * as hex from './index.js';

test('hex holds q and r coordinates', () => {
  expect(hex.hex(7, 2).q).toEqual(7);
  expect(hex.hex(3, 4).r).toEqual(4);
});

test('hex throws for invalid coordinates', () => {
  expect(() => hex.hex(0, 0, 7)).toThrow();
  expect(() => hex.hex(3, 1, 1)).toThrow();
  expect(() => hex.hex(2, 1, 0)).toThrow();
  expect(() => hex.hex(NaN, 1)).toThrow();
  expect(() => hex.hex(0, NaN)).toThrow();
});
