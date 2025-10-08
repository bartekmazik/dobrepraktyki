import countVowels from "../functions/countVowels.ts";
import { expect, test } from "@jest/globals";

test("Palindrome test", () => {
  expect(countVowels("Python")).toBe(2);
  expect(countVowels("AEIOUY")).toBe(6);
  expect(countVowels("bcd")).toBe(0);
  expect(countVowels("")).toBe(0);
  expect(countVowels("Próba żółwia")).toBe(5);
});
