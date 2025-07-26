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
      if (comparator(targetItem, parentItem) < 0) {
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

    const leftChildIdx = (idx << 1) + 1;
    const rightChildIdx = leftChildIdx + 1;

    const leftChildItem = queue[leftChildIdx];
    const rightChildItem = queue[rightChildIdx];

    const smallestChildIdx =
      leftChildItem !== undefined && rightChildItem !== undefined
        ? comparator(leftChildItem, rightChildItem) < 0
          ? leftChildIdx
          : rightChildIdx
        : leftChildItem
          ? leftChildIdx
          : null;

    const smallestChild = smallestChildIdx !== null && queue[smallestChildIdx];

    if (smallestChild && comparator(smallestChild, targetItem) < 0) {
      swap(idx, smallestChildIdx);
      percolateDown(smallestChildIdx);
    }
  };

  const enqueue = (value: T) => {
    queue.push(value);
    percolateUp(queue.length - 1);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      return;
    }

    swap(0, queue.length - 1);

    const targetItem = queue.pop();

    percolateDown(0);

    return targetItem;
  };

  array.forEach((item) => enqueue(item));

  const size = () => queue.length;
  const peek = () => queue[0];
  const isEmpty = () => queue.length === 0;

  return {
    enqueue,
    dequeue,
    size,
    isEmpty,
    peek,
  };
};

export const reverseComparator = <T extends { priority: number }>(a: T, b: T) =>
  b.priority - a.priority;
