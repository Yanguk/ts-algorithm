import { createDeque } from "./dequeu";
import { expect, test } from "bun:test";

test("pushFront, pushBack, front, back", () => {
  const deque = createDeque<number>();
  expect(deque.front()).toBeUndefined();
  expect(deque.back()).toBeUndefined();

  deque.pushFront(2);
  expect(deque.front()).toBe(2);
  expect(deque.back()).toBe(2);

  deque.pushFront(1);
  expect(deque.front()).toBe(1);
  expect(deque.back()).toBe(2);

  deque.pushBack(3);
  expect(deque.front()).toBe(1);
  expect(deque.back()).toBe(3);
});

test("popFront, popBack", () => {
  const deque = createDeque<number>();

  deque.pushBack(1);
  deque.pushBack(2);
  deque.pushBack(3);

  expect(deque.popFront()).toBe(1);
  expect(deque.popBack()).toBe(3);
  expect(deque.popFront()).toBe(2);
  expect(deque.popBack()).toBeUndefined();
  expect(deque.popFront()).toBeUndefined();
});

test("mixed operations", () => {
  const deque = createDeque<string>();
  deque.pushBack("b");
  deque.pushFront("a");
  deque.pushBack("c");

  expect(deque.front()).toBe("a");
  expect(deque.back()).toBe("c");

  expect(deque.popBack()).toBe("c");
  expect(deque.popFront()).toBe("a");
  expect(deque.front()).toBe("b");
  expect(deque.back()).toBe("b");
});
