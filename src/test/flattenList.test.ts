import flattenList from "../functions/flattenList.ts";
import { expect, test } from "@jest/globals";

test("Palindrome test", () => {
  expect(flattenList([1, 2, 3])).toStrictEqual([1, 2, 3]);
  expect(flattenList([1, [2, 3], [4, [5]]])).toStrictEqual([1, 2, 3, 4, 5]);
  expect(flattenList([])).toStrictEqual([]);
  expect(flattenList([[[1]]])).toStrictEqual([1]);
  expect(flattenList([1, [2, [3, [4]]]])).toStrictEqual([1, 2, 3, 4]);
});
