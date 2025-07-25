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
