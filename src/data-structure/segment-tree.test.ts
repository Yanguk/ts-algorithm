import { describe, expect, it } from "bun:test";
import { createLazySegmentTree } from "./segment-tree";

describe("LazySegmentTree", () => {
  it("should correctly build and query range sums", () => {
    const data = [1, 2, 3, 4, 5];
    const tree = createLazySegmentTree(data);

    expect(tree.query(0, 4)).toBe(15);
    expect(tree.query(0, 2)).toBe(6);
    expect(tree.query(2, 4)).toBe(12);
    expect(tree.query(1, 3)).toBe(9);
  });

  it("should correctly handle point updates", () => {
    const data = [1, 2, 3, 4, 5];
    const tree = createLazySegmentTree(data);

    tree.update(2, 10); // [1, 2, 10, 4, 5]
    expect(tree.query(2, 2)).toBe(10);
    expect(tree.query(0, 4)).toBe(22);
    expect(tree.query(1, 3)).toBe(16);
  });

  it("should correctly handle range updates", () => {
    const data = [1, 2, 3, 4, 5];
    const tree = createLazySegmentTree(data);

    tree.updateRange(1, 3, 10); // [1, 12, 13, 14, 5]
    expect(tree.query(0, 4)).toBe(45);
    expect(tree.query(1, 4)).toBe(44);
    expect(tree.query(1, 3)).toBe(39);
    expect(tree.query(1, 1)).toBe(12);
    expect(tree.query(2, 2)).toBe(13);
    expect(tree.query(3, 3)).toBe(14);
    expect(tree.query(0, 0)).toBe(1);
    expect(tree.query(4, 4)).toBe(5);
  });

  it("should correctly handle consecutive range updates", () => {
    const data = [1, 2, 3, 4, 5];
    const tree = createLazySegmentTree(data);

    tree.updateRange(0, 2, 5); // [6, 7, 8, 4, 5]
    tree.updateRange(2, 4, 10); // [6, 7, 18, 14, 15]

    expect(tree.query(0, 4)).toBe(60);
    expect(tree.query(2, 2)).toBe(18);
    expect(tree.query(1, 3)).toBe(39);
  });
});
