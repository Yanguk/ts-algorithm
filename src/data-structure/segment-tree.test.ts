import { describe, expect, it } from "bun:test";
import { createSegmentTree } from "./segment-tree";

describe("SegmentTree", () => {
  describe("Sum Operation", () => {
    const data = [1, 2, 3, 4, 5];
    const sum = (a: number, b: number) => a + b;
    const tree = createSegmentTree(data, sum, 0);

    it("should correctly query ranges", () => {
      expect(tree.query(0, 5)).toBe(15);
      expect(tree.query(0, 3)).toBe(6);
      expect(tree.query(2, 5)).toBe(12);
      expect(tree.query(1, 4)).toBe(9);
    });

    it("should correctly update values", () => {
      tree.update(2, 10); // [1, 2, 10, 4, 5]
      expect(tree.query(0, 5)).toBe(22);
      expect(tree.query(2, 3)).toBe(10);
      expect(tree.query(1, 4)).toBe(16);
    });

    it("should handle invalid ranges", () => {
      expect(tree.query(5, 5)).toBe(0);
      expect(tree.query(3, 2)).toBe(0);
    });
  });

  describe("Min Operation", () => {
    const data = [5, 2, 8, 1, 9];
    const min = (a: number, b: number) => Math.min(a, b);
    const tree = createSegmentTree(data, min, Infinity);

    it("should correctly query min in ranges", () => {
      expect(tree.query(0, 5)).toBe(1);
      expect(tree.query(0, 3)).toBe(2);
      expect(tree.query(2, 5)).toBe(1);
    });

    it("should correctly update and query min", () => {
      tree.update(3, 10); // [5, 2, 8, 10, 9]
      expect(tree.query(0, 5)).toBe(2);
      expect(tree.query(2, 5)).toBe(8);
    });
  });

  describe("String concatenation Operation", () => {
    const data = ["a", "b", "c"];
    const concat = (a: string, b: string) => a + b;
    const tree = createSegmentTree(data, concat, "");

    it("should correctly query string ranges", () => {
      expect(tree.query(0, 3)).toBe("abc");
      expect(tree.query(1, 3)).toBe("bc");
    });
  });
});
