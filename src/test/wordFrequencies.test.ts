import wordFrequencies from "../functions/wordFrequencies.ts";
import { expect, test } from "@jest/globals";

test("Palindrome test", () => {
  expect(wordFrequencies("To be or not to be")).toStrictEqual({
    to: 2,
    be: 2,
    or: 1,
    not: 1,
  });
  expect(wordFrequencies("Hello, hello!")).toStrictEqual({ hello: 2 });
  expect(wordFrequencies("")).toStrictEqual({});
  expect(wordFrequencies("Python Python python")).toStrictEqual({ python: 3 });
  expect(wordFrequencies("Ala ma kota, a kot ma Ale.")).toStrictEqual({
    ala: 1,
    ma: 2,
    kota: 1,
    a: 1,
    kot: 1,
    ale: 1,
  });
});
