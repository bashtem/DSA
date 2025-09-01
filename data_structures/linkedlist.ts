export class Node<T = unknown> {
  public data: T;
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

  public add(data: T) {
    let newNode = new Node(data);
    if (!this.capacity) {
      this.head = newNode;
      this.tail = this.head;
      this.capacity++;
      return;
    }

    this.tail.next = newNode;
    this.tail = this.tail.next;
    this.capacity++;
  }

  //remove a node from the end of list
  public pop() {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = this.tail = null as unknown as Node<T>;
      this.capacity--;
      return;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    let removed = prev.next;
    prev.next = null as unknown as Node<T>;
    this.tail = prev;
    this.capacity--;
    return removed;
  }

  public shift() {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = this.tail = null as unknown as Node<T>;
      this.capacity--;
      return;
    }

    let newHead = this.head.next;
    let removed = this.head;
    this.head = null as unknown as Node<T>;
    this.head = newHead;
    this.capacity--;
    return removed;
  }

  public unshift(data: T) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
      this.capacity++;
      return;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.capacity++;
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


class DoublyLinkedList{
  
}