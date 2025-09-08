export class Node<T = unknown> {
  public data: T;
  public prev: Node<T> = null as unknown as Node<T>;
  public next: Node<T> = null as unknown as Node<T>;

  public constructor(data: T) {
    this.data = data;
  }
}

/**
 * add
 * pop
 * shift
 * unshift
 * reverse
 * display
 * not imple -> get, set, insert, remove
 */

export class LinkedList<T> {
  private head: Node<T>;
  private tail: Node<T>;
  private capacity;

  constructor() {
    this.head = null as unknown as Node<T>;
    this.tail = null as unknown as Node<T>;
    this.capacity = 0;
  }

  public push(data: T) {
    let newNode = new Node(data);
    if (!this.capacity) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }

    this.capacity++;
    return this;
  }

  //remove a node from the end of list
  public pop() {
    if (!this.head) return;

    let removed = this.head;

    if (this.capacity === 1) {
      this.head = this.tail = null as unknown as Node<T>;
    } else {
      let prev = this.head;
      let current = this.head.next;

      while (current.next) {
        prev = current;
        current = current.next;
      }

      removed = prev.next;
      prev.next = null as unknown as Node<T>;
      this.tail = prev;
    }

    this.capacity--;
    return removed;
  }

  public shift() {
    if (!this.head) return;

    let removed = this.head;

    if (!this.head.next) {
      this.head = this.tail = null as unknown as Node<T>;
    } else {
      let newHead = this.head.next;
      this.head = null as unknown as Node<T>;
      this.head = newHead;
    }

    this.capacity--;
    return removed;
  }

  public unshift(data: T) {
    let newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.capacity++;
    return this;
  }

  public findRemove(removeData: T) {
    if (!this.head) return;

    // Check if the head is the search item
    if (this.head.data == removeData) {
      this.head = this.head.next;
      this.capacity--;
      return;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current) {
      let tempNext = current.next;
      if (current.data == removeData) {
        prev.next = tempNext;
        current.next = null as unknown as Node<T>;
        this.capacity--;
      } else {
        prev = current;
      }
      current = tempNext;
    }
  }

  public reverse() {
    if (!this.head) return null;

    if (!this.head.next) return this.head;

    let prev = null as unknown as Node<T>;
    let current = this.head;
    this.tail = current;

    while (current.next) {
      let nextNode = current.next;
      current.next = prev;
      prev = current;
      current = nextNode;
    }

    current.next = prev;
    this.head = current;
  }

  /**
   * rotate
    This function should rotate all the nodes in the list by some number passed in.
    For instance, if your list looks like 1 -> 2 -> 3 -> 4 -> 5 and you rotate by 2,
    the list should be modified to 3 -> 4 -> 5 -> 1 -> 2. The number passed in to rotate can be any integer.
    Time Complexity: O(N), where N is the length of the list.
    Space Complexity: O(1)
   */
  public rotate(index: number) {
    if (index > this.capacity || index == 0 || index < -this.capacity)
      return null;

    let current = this.head;
    let counter = 0;
    index = index < 0 ? this.capacity + index : index;

    while (counter < index) {
      let nextNode = current.next;
      current.next = null as unknown as Node<T>;
      this.head = nextNode;
      this.tail.next = current;
      this.tail = this.tail.next;
      current = nextNode;
      counter++;
    }
    return this;
  }

  public get size(): number {
    return this.capacity;
  }

  public display() {
    let current = this.head;
    let nodeCount = 0;
    console.log(`---------- START --------- \n`);
    if (!current) {
      console.log("Empty List");
      return;
    }
    do {
      console.log(`Node number ${nodeCount} -> ${current.data}\n`);
      current = current.next;
      nodeCount++;
      if (!current) break;
    } while (current.next);
    if (current) console.log(`Node number ${nodeCount} -> ${current.data}\n`);
    console.log(`---------- END --------- \n\n`);
  }
}

export class DoublyLinkedList<T> {
  private head: Node<T>;
  private tail: Node<T>;
  private capacity;

  constructor() {
    this.head = null as unknown as Node<T>;
    this.tail = null as unknown as Node<T>;
    this.capacity = 0;
  }

  public push(data: T) {
    let newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.capacity++;
    return this;
  }

  public pop() {
    if (!this.head) return null;

    let removed = this.tail;

    if (this.capacity == 1) {
      this.head = this.tail = null as unknown as Node<T>;
    } else {
      this.tail = removed.prev;
      this.tail.next = null as unknown as Node<T>;
      removed.prev = null as unknown as Node<T>;
    }

    this.capacity--;
    return removed;
  }

  public shift() {
    if (!this.head) return null;

    let removed = this.head;

    if (this.capacity == 1) {
      this.head = this.tail = null as unknown as Node<T>;
    } else {
      this.head = removed.next;
      this.head.prev = null as unknown as Node<T>;
      removed.next = null as unknown as Node<T>;
    }
    this.capacity--;
    return removed;
  }

  public unshift(data: T) {
    let newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.capacity++;
    return this;
  }

  public get(index: number) {
    if (index > this.capacity || index < 0) return null as unknown as Node<T>;

    let mid = Math.floor(this.capacity / 2);

    let current = this.tail;
    let counter = this.capacity - 1;

    if (index > mid) {
      while (counter !== index) {
        current = current.prev;
        counter--;
      }
    } else {
      counter = 0;
      current = this.head;
      while (counter !== index) {
        current = current.next;
        counter++;
      }
    }

    return current;
  }

  public set(index: number, data: T) {
    let foundNode = this.get(index);

    if (foundNode === null) return false;

    foundNode.data = data;
    return true;
  }

  public insert(index: number, data: T) {
    if (index === 0) return this.unshift(data);
    if (index === this.capacity - 1) return this.push(data);

    let foundNode = this.get(index);

    if (foundNode === null) return this;

    let newNode = new Node(data);

    let prevNode = foundNode.prev;
    prevNode.next = newNode;
    newNode.prev = prevNode;

    newNode.next = foundNode;
    foundNode.prev = newNode;
    this.capacity++;
    return this;
  }

  public remove(index: number) {
    if (index === 0) return this.shift();

    if (index === this.capacity - 1) return this.pop();

    let removedNode = this.get(index);

    let prevNode = removedNode.prev;
    let nextNode = removedNode.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    removedNode.prev = removedNode.next = null as unknown as Node<T>;
    this.capacity--;
    return removedNode;
  }
}
