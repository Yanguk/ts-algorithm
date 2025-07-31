import { createPriorityQueue, reverseComparator } from "./priority-queue";
import { expect, test } from "bun:test";

test("should enqueue and dequeue in priority order (min-heap)", () => {
  const minPq = createPriorityQueue([
    { value: "medium", priority: 5 },
    { value: "low", priority: 10 },
    { value: "high", priority: 1 },
  ]);

  expect(minPq.size()).toBe(3);
  expect(minPq.peek()?.value).toBe("high");
  expect(minPq.dequeue()?.value).toBe("high");
  expect(minPq.dequeue()?.value).toBe("medium");
  expect(minPq.dequeue()?.value).toBe("low");
  expect(minPq.isEmpty()).toBe(true);
});

test("should handle negative priorities correctly (min-heap)", () => {
  const pq = createPriorityQueue([
    { value: "minus five", priority: -5 },
    { value: "zero", priority: 0 },
    { value: "minus ten", priority: -10 },
    { value: "plus three", priority: 3 },
  ]);
  expect(pq.dequeue()?.value).toBe("minus ten");
  expect(pq.dequeue()?.value).toBe("minus five");
  expect(pq.dequeue()?.value).toBe("zero");
  expect(pq.dequeue()?.value).toBe("plus three");
  expect(pq.isEmpty()).toBe(true);
});

test("should handle negative priorities correctly (max-heap)", () => {
  const pq = createPriorityQueue(
    [
      { value: "minus five", priority: -5 },
      { value: "zero", priority: 0 },
      { value: "minus ten", priority: -10 },
      { value: "plus three", priority: 3 },
    ],
    reverseComparator,
  );
  expect(pq.dequeue()?.value).toBe("plus three");
  expect(pq.dequeue()?.value).toBe("zero");
  expect(pq.dequeue()?.value).toBe("minus five");
  expect(pq.dequeue()?.value).toBe("minus ten");
  expect(pq.isEmpty()).toBe(true);
});

test("should work with custom comparator for max-heap", () => {
  const maxPq = createPriorityQueue(
    [
      { value: "high", priority: 1 },
      { value: "medium", priority: 5 },
      { value: "low", priority: 10 },
    ],
    reverseComparator,
  );

  expect(maxPq.peek()?.value).toBe("low");
  expect(maxPq.dequeue()?.value).toBe("low");
  expect(maxPq.dequeue()?.value).toBe("medium");
  expect(maxPq.dequeue()?.value).toBe("high");
  expect(maxPq.isEmpty()).toBe(true);
});

test("should handle empty queue correctly", () => {
  const pq = createPriorityQueue();
  expect(pq.dequeue()).toBeUndefined();
  expect(pq.peek()).toBeUndefined();
  expect(pq.isEmpty()).toBe(true);
});

test("should be able to enqueue and dequeue dynamically", () => {
  const pq = createPriorityQueue<{ value: string; priority: number }>();

  pq.enqueue({ value: "a", priority: 5 });
  pq.enqueue({ value: "b", priority: 2 });
  pq.enqueue({ value: "c", priority: 7 });
  expect(pq.dequeue()?.value).toBe("b");

  pq.enqueue({ value: "d", priority: 1 });
  expect(pq.dequeue()?.value).toBe("d");
  expect(pq.dequeue()?.value).toBe("a");
  expect(pq.dequeue()?.value).toBe("c");
  expect(pq.isEmpty()).toBe(true);
});

test("should handle a large number of items efficiently and in correct order", () => {
  const size = 1000;

  const items = Array.from({ length: size }, (_, i) => ({
    value: i,
    priority: Math.floor(Math.random() * (2 * size)) - size,
  }));

  const pq = createPriorityQueue<{ value: number; priority: number }>(items);

  const sorted = [...items].sort((a, b) => a.priority - b.priority);

  for (const item of sorted) {
    expect(pq.dequeue()?.priority).toBe(item.priority);
  }

  expect(pq.isEmpty()).toBe(true);
});
