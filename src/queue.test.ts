import { createQueue } from "./queque";
import { expect, test } from "bun:test";

test("enqueue & size", () => {
  const q = createQueue<number>();

  expect(q.size()).toBe(0);

  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);

  expect(q.size()).toBe(3);
});

test("dequeue & order", () => {
  const q = createQueue<number>();

  q.enqueue(99);
  q.enqueue(100);
  expect(q.dequeue()).toBe(99);
  expect(q.dequeue()).toBe(100);
  expect(q.dequeue()).toBeUndefined();
});

test("peek & isEmpty", () => {
  const q = createQueue<string>();

  expect(q.isEmpty()).toBe(true);
  expect(q.peek()).toBeUndefined();
  q.enqueue("a");
  expect(q.isEmpty()).toBe(false);
  expect(q.peek()).toBe("a");
  q.dequeue();
  expect(q.isEmpty()).toBe(true);
  expect(q.peek()).toBeUndefined();
});
