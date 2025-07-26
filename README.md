# ts-data-structures

> 🇺🇸 For English version, see [README.md](./README.en.md)

## 개발

의존성 설치:

```bash
bun install
```

테스트 실행:

```bash
bun run test
```

## 개요

알고리즘 문제를 풀 때마다, 자바스크립트에 없는 자료구조가 나오면 즉석에서 구현하기 불편한 경우가 많았습니다.

그래서 가장 기본적인 자료구조들을 최대한 간단하게 구현하여, 암기해서 바로 쓸 수 있도록 하는게 목표입니다.

### 큐(Queue)

단일 연결 리스트로 구현된 간단한 큐 자료구조입니다. FIFO(선입선출) 연산에 유용합니다.

#### 사용 예시

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

- `enqueue(value: T): void` — 값을 큐의 끝에 추가합니다.
- `dequeue(): T | undefined` — 맨 앞의 값을 제거하고 반환합니다. 비어있으면 `undefined` 반환.
- `size(): number` — 큐의 요소 개수를 반환합니다.
- `peek(): T | undefined` — 맨 앞의 값을 제거하지 않고 반환합니다. 비어있으면 `undefined` 반환.
- `isEmpty(): boolean` — 큐가 비어있으면 `true`, 아니면 `false` 반환.

#### 시간 복잡도

- `enqueue`, `dequeue`: O(1)
- `peek`, `isEmpty`, `size`: O(1)

#### 참고

- 내부적으로 단일 연결 리스트를 사용하여 enqueue/dequeue 연산이 효율적으로 동작합니다.
- 모든 연산은 상수 시간에 처리됩니다.

---

### 우선순위 큐(Priority Queue)

이진 힙(Binary Heap) 기반의 우선순위 큐 자료구조입니다. 각 요소는 `priority` 속성을 가지고, 작은 값일수록 높은 우선순위를 가집니다. 커스텀 비교 함수도 지원합니다.

#### 사용 예시

```ts
import { createPriorityQueue, reverseComparator } from "ts-data-structures";

// 기본: 최소 힙 (priority가 낮을수록 먼저 나옴)
const pq = createPriorityQueue<{ value: string; priority: number }>();
pq.enqueue({ value: "task1", priority: 2 });
pq.enqueue({ value: "task2", priority: 1 });
console.log(pq.dequeue()); // { value: "task2", priority: 1 }

// 최대 힙 사용 예시
const maxPq = createPriorityQueue<{ value: string; priority: number }>(
  [],
  reverseComparator,
);
maxPq.enqueue({ value: "task1", priority: 2 });
maxPq.enqueue({ value: "task2", priority: 1 });
console.log(maxPq.dequeue()); // { value: "task1", priority: 2 }
```

#### API

- `enqueue(value: T): void` — 값을 큐에 추가합니다.
- `dequeue(): T | undefined` — 가장 높은 우선순위 값을 제거하고 반환합니다. 비어있으면 `undefined` 반환.
- `size(): number` — 큐의 요소 개수를 반환합니다.
- `peek(): T | undefined` — 가장 높은 우선순위 값을 제거하지 않고 반환합니다. 비어있으면 `undefined` 반환.
- `isEmpty(): boolean` — 큐가 비어있으면 `true`, 아니면 `false` 반환.

#### 시간 복잡도

- `enqueue`, `dequeue`: O(log n)
- `peek`, `isEmpty`, `size`: O(1)

#### 참고

- 이진 힙(Binary Heap)으로 구현되어 효율적입니다.
- 커스텀 비교 함수(comparator)를 파라미터로 전달하여 최소 힙, 최대 힙 등 다양한 우선순위 기준 사용이 가능합니다.
- reverseComparator를 사용하면 최대 힙을 쉽게 만들 수 있습니다.

---

### 데크(Deque)

양방향 연결 리스트로 구현된 간단한 데크 자료구조입니다. 큐와 달리 양쪽 끝에서 삽입/삭제가 모두 가능합니다.

#### 사용 예시

```ts
import { createDeque } from "ts-data-structures";

const deque = createDeque<number>();
deque.pushFront(2);
deque.pushBack(3);
deque.pushFront(1);

console.log(deque.front()); // 1
console.log(deque.back()); // 3
console.log(deque.popFront()); // 1
console.log(deque.popBack()); // 3
```

#### API

- `pushFront(value: T): void` — 값을 맨 앞에 추가합니다.
- `pushBack(value: T): void` — 값을 맨 뒤에 추가합니다.
- `popFront(): T | undefined` — 맨 앞의 값을 제거하고 반환합니다. 비어있으면 `undefined` 반환.
- `popBack(): T | undefined` — 맨 뒤의 값을 제거하고 반환합니다. 비어있으면 `undefined` 반환.
- `front(): T | undefined` — 맨 앞의 값을 제거하지 않고 반환합니다. 비어있으면 `undefined` 반환.
- `back(): T | undefined` — 맨 뒤의 값을 제거하지 않고 반환합니다. 비어있으면 `undefined` 반환.

#### 시간 복잡도

- `pushFront`, `pushBack`, `popFront`, `popBack`: O(1)
- `front`, `back`: O(1)

#### 참고

- 양방향 연결 리스트로 구현되어 양쪽 끝에서 상수 시간에 삽입/삭제할 수 있습니다.
- 모든 연산은 상수 시간에 처리됩니다.
