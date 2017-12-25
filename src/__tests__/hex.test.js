import * as Hex from '../index.js';

test('hex holds q and r coordinates', () => {
  expect(Hex.hex(7, 2).q).toEqual(7);
  expect(Hex.hex(3, 4).r).toEqual(4);
});

test('hex throws for invalid coordinates', () => {
  expect(() => Hex.hex(0, 0, 7)).toThrow();
  expect(() => Hex.hex(3, 1, 1)).toThrow();
  expect(() => Hex.hex(2, 1, 0)).toThrow();
});
