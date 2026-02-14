export function createLazySegmentTree(arr: number[]) {
  const n = arr.length;
  const tree: number[] = new Array(4 * n).fill(0);
  const lazy: number[] = new Array(4 * n).fill(0);

  /**
   * 세그먼트 트리 구축
   */
  const build = (node: number, start: number, end: number): number => {
    if (start === end) {
      tree[node] = arr[start]!;

      return tree[node];
    }

    const mid = Math.floor((start + end) / 2);

    const leftChild = 2 * node;
    const rightChild = 2 * node + 1;

    const leftSum = build(leftChild, start, mid);
    const rightSum = build(rightChild, mid + 1, end);

    tree[node] = leftSum + rightSum;

    return tree[node];
  };

  /**
   * Lazy 값을 자식에게 전파
   */
  const propagate = (node: number, start: number, end: number): void => {
    if (lazy[node] !== 0) {
      // 현재 노드에 lazy 값 적용
      tree[node]! += lazy[node]! * (end - start + 1);

      // 리프 노드가 아니면 자식에게 전파
      if (start !== end) {
        lazy[2 * node]! += lazy[node]!;
        lazy[2 * node + 1]! += lazy[node]!;
      }

      // lazy 값 초기화
      lazy[node] = 0;
    }
  };

  /**
   * 구간 업데이트 헬퍼
   */
  function updateRangeHelper(
    node: number,
    start: number,
    end: number,
    left: number,
    right: number,
    value: number,
  ): void {
    // 범위를 벗어난 경우
    if (right < start || end < left) {
      return;
    }

    // 완전히 포함되는 경우
    if (left <= start && end <= right) {
      lazy[node]! += value;
      return;
    }

    // 부분적으로 포함되는 경우
    const mid = (start + end) >> 1;

    updateRangeHelper(2 * node, start, mid, left, right, value);
    updateRangeHelper(2 * node + 1, mid + 1, end, left, right, value);

    const leftVal = tree[2 * node]! + lazy[2 * node]! * (mid - start + 1);
    const rightVal = tree[2 * node + 1]! + lazy[2 * node + 1]! * (end - mid);

    tree[node] = leftVal + rightVal;
  }

  /**
   * 구간 합 쿼리 헬퍼
   */
  function queryHelper(
    node: number,
    start: number,
    end: number,
    left: number,
    right: number,
  ): number {
    propagate(node, start, end);

    // 범위를 벗어난 경우
    if (right < start || end < left) {
      return 0;
    }

    // 완전히 포함되는 경우
    if (left <= start && end <= right) {
      return tree[node]!;
    }

    // 부분적으로 포함되는 경우
    const mid = (start + end) >> 1;

    const leftSum = queryHelper(2 * node, start, mid, left, right);
    const rightSum = queryHelper(2 * node + 1, mid + 1, end, left, right);

    return leftSum + rightSum;
  }

  // 초기화
  if (n > 0) {
    build(1, 0, n - 1);
  }

  return {
    /**
     * 구간 업데이트 (구간의 모든 값에 value 더하기)
     */
    updateRange: (left: number, right: number, value: number): void => {
      updateRangeHelper(1, 0, n - 1, left, right, value);
    },

    /**
     * 구간 합 쿼리
     */
    query: (left: number, right: number): number => {
      return queryHelper(1, 0, n - 1, left, right);
    },

    /**
     * 단일 인덱스 업데이트
     */
    update: (index: number, value: number): void => {
      const currentValue = queryHelper(1, 0, n - 1, index, index);
      const diff = value - currentValue;
      updateRangeHelper(1, 0, n - 1, index, index, diff);
    },
  };
}
