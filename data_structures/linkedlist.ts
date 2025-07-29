export class Node<T> {
  public data: T;
  public next: Node<T> = null as unknown as Node<T>;

  public constructor(data: T) {
    this.data = data;
  }
}

export class LinkedList<T> {
  private head: Node<T> = null as unknown as Node<T>;
  private capacity = 0;

  constructor(head: Node<T>) {
    this.head = head;
  }

  // Adding node implemention
  public add(newNode: Node<T>) {
    let current = this.head;

    if (!current) {
      this.head = newNode;
      return;
    }

    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    this.capacity++;
  }

  // Removing node implementation
  public remove(removeData: T) {
    // can also remove using node index position from method parameter
    let current = this.head;
    let prev = current;

    if (!current) return;

    // Check if the head if the found item
    if (current.data == removeData) {
      this.head = current.next;
      current.next = null as unknown as Node<T>;
      return;
    }

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
