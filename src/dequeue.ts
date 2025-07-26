export const createDeque = <T>() => {
  type Node<T> = {
    value: T;
    before: Node<T> | null;
    next: Node<T> | null;
  };

  let head: Node<T> | null = null;
  let tail: Node<T> | null = null;
  let length = 0;

  const pushFront = (value: T) => {
    const newNode: Node<T> = { value, next: null, before: null };
    length += 1;

    if (!tail) {
      head = tail = newNode;
    } else {
      const temp = head;
      head = newNode;
      head.next = temp;
    }
  };

  const pushBack = (value: T) => {
    const newNode: Node<T> = { value, next: null, before: null };
    length += 1;

    if (!tail) {
      head = tail = newNode;
    } else {
      tail.next = newNode;
      newNode.before = tail;

      tail = newNode;
    }
  };

  const popFront = () => {
    const targetNode = head;

    if (!targetNode) {
      return;
    }

    length -= 1;

    if (head === tail) {
      head = tail = null;
    } else {
      head = targetNode.next;

      if (head) {
        head.before = null;
      }
    }

    return targetNode.value;
  };

  const popBack = () => {
    const targetNode = tail;

    if (!targetNode) {
      return;
    }

    length -= 1;

    if (head === tail) {
      head = tail = null;
    } else {
      tail = targetNode.before;

      if (tail) {
        tail.next = null;
      }
    }

    return targetNode.value;
  };

  const front = () => head?.value;
  const back = () => tail?.value;

  return {
    pushFront,
    pushBack,
    popFront,
    popBack,
    front,
    back,
  };
};
