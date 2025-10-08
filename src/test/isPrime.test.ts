import isPrime from "../functions/isPrime.ts";
import { expect, test } from "@jest/globals";

test("Palindrome test", () => {
  expect(isPrime(2)).toBe(true);
  expect(isPrime(3)).toBe(true);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(0)).toBe(false);
  expect(isPrime(1)).toBe(false);
  expect(isPrime(5)).toBe(true);
  expect(isPrime(97)).toBe(true);
});
