const range = (start: number, end: number, step = 1) =>
  Array.from({ length: (end - start) / step }, (_, idx) => start + idx * step);

export type SegmentTree<T> = {
  update: (index: number, value: T) => void;
  query: (left: number, right: number) => T;
  size: number;
};

export const createSegmentTree = <T>(
  data: T[],
  combiner: (a: T, b: T) => T,
  identity: T,
): SegmentTree<T> => {
  const n = data.length;
  const tree: T[] = new Array(2 * n).fill(identity);

  // leaves
  for (const i of range(0, n)) {
    tree[n + i] = data[i]!;
  }

  // build
  for (const i of range(n - 1, 0, -1)) {
    tree[i] = combiner(tree[2 * i]!, tree[2 * i + 1]!);
  }

  const update = (index: number, value: T): void => {
    if (index < 0 || index >= n) {
      throw new Error("Index out of bounds");
    }

    let i = index + n;
    tree[i] = value;

    while (i > 1) {
      i >>= 1;
      tree[i] = combiner(tree[2 * i]!, tree[2 * i + 1]!);
    }
  };

  const query = (left: number, right: number): T => {
    if (left < 0 || right > n || left >= right) {
      return identity;
    }

    let res = identity;
    let l = left + n;
    let r = right + n;

    while (l < r) {
      if (l & 1) {
        res = combiner(res, tree[l]!);
        l++;
      }
      if (r & 1) {
        r--;
        res = combiner(res, tree[r]!);
      }
      l >>= 1;
      r >>= 1;
    }

    return res;
  };

  return { update, query, size: n };
};
