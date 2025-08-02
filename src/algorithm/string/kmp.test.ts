import { expect, test } from "bun:test";
import { kmpSearch } from "./kmp";

test("should find the pattern at the correct index", () => {
  expect(kmpSearch("ababcabcabababd", "ababd")).toEqual([10]);
});

test("should return multiple matches for repeating patterns", () => {
  expect(kmpSearch("abcabcabcabc", "abc")).toEqual([0, 3, 6, 9]);
});

test("should return an empty array when there is no match", () => {
  expect(kmpSearch("abcdefgh", "xyz")).toEqual([]);
});

test("should work when pattern is at the start", () => {
  expect(kmpSearch("patternhere", "pattern")).toEqual([0]);
});

test("should work when pattern is at the end", () => {
  expect(kmpSearch("somethingend", "end")).toEqual([9]);
});

test("should work when text and pattern are the same", () => {
  expect(kmpSearch("exactmatch", "exactmatch")).toEqual([0]);
});

test("should return [] for empty pattern", () => {
  expect(kmpSearch("anything", "")).toEqual([]);
});

test("should return [] for empty text", () => {
  expect(kmpSearch("", "abc")).toEqual([]);
});

test("should return [] when both text and pattern are empty", () => {
  expect(kmpSearch("", "")).toEqual([]);
});
