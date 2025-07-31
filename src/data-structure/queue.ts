export const createQueue = <T>() => {
  type Node<T> = {
    value: T;
    next: Node<T> | null;
  };

  let head: Node<T> | null = null;
  let tail: Node<T> | null = null;
  let length = 0;

  const enqueue = (value: T) => {
    const newNode: Node<T> = { value, next: null };

    if (!tail) {
      head = tail = newNode;
    } else {
      tail.next = newNode;
      tail = newNode;
    }

    length++;
  };

  const dequeue = () => {
    const targetNode = head;

    if (!targetNode) {
      return;
    }

    const targetValue = targetNode.value;
    const nextHead = targetNode.next;

    head = nextHead;
    length--;

    if (!head) {
      tail = null;
    }

    return targetValue;
  };

  const size = () => length;
  const peek = () => head?.value;
  const isEmpty = () => !length;

  return {
    enqueue,
    dequeue,
    size,
    peek,
    isEmpty,
  };
};
