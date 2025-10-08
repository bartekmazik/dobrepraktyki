import isPalindrome from "../functions/palindrome.ts";
import { expect, test } from "@jest/globals";

test("Palindrome test", () => {
  expect(isPalindrome("Kajak")).toBe(true);
  expect(isPalindrome("Kobyła ma mały bok")).toBe(true);
  expect(isPalindrome("python")).toBe(false);
  expect(isPalindrome("")).toBe(true);
  expect(isPalindrome("A")).toBe(true);
});
