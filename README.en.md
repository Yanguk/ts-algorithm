# ts-data-structures

> 🇰🇷 한국어 버전은 [README.md](./README.ko.md)에서 확인할 수 있습니다.

## Development

To install dependencies:

```bash
bun install
```

To test:

```bash
bun run test
```

## Overview

Whenever I solve algorithm problems,
I often encounter issues when JavaScript lacks certain data structures, making it inconvenient to implement on the spot.

So, I implemented the simplest versions of essential data structures, making them easy to memorize and use instantly.

### Queue

A simple queue data structure implemented as a singly linked list. Useful for FIFO (First-In, First-Out) operations.

#### Usage

```ts
import { createQueue } from "ts-data-structures";

const queue = createQueue<number>();
queue.enqueue(1);
queue.enqueue(2);

console.log(queue.dequeue()); // 1
console.log(queue.size()); // 1
console.log(queue.peek()); // 2
console.log(queue.isEmpty()); // false
queue.dequeue();
console.log(queue.isEmpty()); // true
```

#### API

- `enqueue(value: T): void` — Add an item to the end of the queue.
- `dequeue(): T | undefined` — Remove and return the item at the front. Returns `undefined` if empty.
- `size(): number` — Returns the number of items in the queue.
- `peek(): T | undefined` — Returns the item at the front without removing it. Returns `undefined` if empty.
- `isEmpty(): boolean` — Returns `true` if the queue is empty, `false` otherwise.

#### Time Complexity

- `enqueue`, `dequeue`: O(1)
- `peek`, `isEmpty`, `size`: O(1)

#### Note

- This queue uses a singly linked list internally for efficient enqueue/dequeue operations.
- All operations are performed in constant time.

---

### Priority Queue

A priority queue data structure implemented with a binary heap. Each element should have a `priority` property, where lower values indicate higher priority. Supports custom comparator functions for flexible ordering.

#### Usage

```ts
import { createPriorityQueue, reverseComparator } from "ts-data-structures";

// By default: min-heap (lower priority value comes first)
const pq = createPriorityQueue<{ value: string; priority: number }>();
pq.enqueue({ value: "task1", priority: 2 });
pq.enqueue({ value: "task2", priority: 1 });
console.log(pq.dequeue()); // { value: "task2", priority: 1 }

// Max-heap example
const maxPq = createPriorityQueue<{ value: string; priority: number }>(
  [],
  reverseComparator,
);
maxPq.enqueue({ value: "task1", priority: 2 });
maxPq.enqueue({ value: "task2", priority: 1 });
console.log(maxPq.dequeue()); // { value: "task1", priority: 2 }
```

#### API

- `enqueue(value: T): void` — Add an item to the priority queue.
- `dequeue(): T | undefined` — Remove and return the item with the highest priority. Returns `undefined` if empty.
- `size(): number` — Returns the number of items in the queue.
- `peek(): T | undefined` — Returns the item with the highest priority without removing it. Returns `undefined` if empty.
- `isEmpty(): boolean` — Returns `true` if the queue is empty, `false` otherwise.

#### Time Complexity

- `enqueue`, `dequeue`: O(log n)
- `peek`, `isEmpty`, `size`: O(1)

#### Note

- Implemented as a binary heap for efficiency.
- You can pass a custom comparator function to change priority rules (e.g., min-heap, max-heap).
- Use `reverseComparator` for an easy max-heap implementation.
