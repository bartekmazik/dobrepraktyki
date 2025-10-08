import calculateDiscount from "../functions/calculateDiscount.ts";
import { expect, test } from "@jest/globals";

test("Palindrome test", () => {
  expect(calculateDiscount(100, 0.2)).toBe(80);
  expect(calculateDiscount(50, 0.0)).toBe(50);
  expect(calculateDiscount(200, 1)).toBe(0);
  expect(() => calculateDiscount(100, -0.1)).toThrowError();
  expect(() => calculateDiscount(100, 1.5)).toThrowError();
});
