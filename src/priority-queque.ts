export const createPriorityQueue = <T extends { priority: number }>(
  array: T[] = [],
  comparator: (a: T, b: T) => number = (a, b) => a.priority - b.priority,
) => {
  const queue: T[] = [];

  const swap = (i: number, j: number) => {
    const temp = queue[i];

    queue[i] = queue[j]!;
    queue[j] = temp!;
  };

  // *percolate: 거슬러가다.
  const percolateUp = (idx: number) => {
    const parent = (idx - 1) >> 1;

    const targetItem = queue[idx];
    const parentItem = queue[parent];

    if (targetItem && parentItem) {
      if (comparator(targetItem, parentItem) >= 0) {
        swap(idx, parent);

        percolateUp(parent);
      }
    }
  };

  const percolateDown = (idx: number) => {
    const targetItem = queue[idx];

    if (!targetItem) {
      return;
    }

    const leftIdx = (2 * idx + 1) << 1;
    const rightIdx = leftIdx + 1;

    const leftItem = queue[leftIdx];
    const rightItem = queue[rightIdx];

    const smallestChildIdx =
      leftItem && rightItem
        ? comparator(leftItem, rightItem) < 0
          ? leftIdx
          : rightIdx
        : leftItem
          ? leftIdx
          : null;

    const smallestChild = smallestChildIdx && queue[smallestChildIdx];

    if (smallestChild && comparator(targetItem, smallestChild) > 0) {
      swap(idx, smallestChildIdx);
      percolateDown(smallestChildIdx);
    }
  };

  const enqueue = (value: T) => {
    queue.push(value);
    percolateUp(queue.length - 1);
  };

  const dequeue = () => {
    swap(0, queue.length - 1);

    const targetItem = queue.pop();

    percolateDown(0);

    return targetItem;
  };

  const size = () => queue.length;

  const peek = () => queue[0];

  const isEmpty = () => queue.length === 0;

  array.forEach((item) => enqueue(item));

  return {
    enqueue,
    dequeue,
    size,
    isEmpty,
    peek,
  };
};
