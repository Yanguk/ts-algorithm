# ts-data-structures

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
