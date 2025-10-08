import fibonacci from "../functions/fibonacci.ts";
import { expect, test } from "@jest/globals";

test("Palindrome test", () => {
  expect(fibonacci(0)).toBe(0);
  expect(fibonacci(1)).toBe(1);
  expect(fibonacci(5)).toBe(5);
  expect(fibonacci(10)).toBe(55);
  expect(() => fibonacci(-1)).toThrow("non-negative only");
});
