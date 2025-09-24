import { ArrayList } from "./arraylist";
import { Node } from "./linkedlist";

export class Queue<T = unknown> {
  private arrayList: ArrayList<T>;
  private capacity: number;

  constructor(){
    this.arrayList = new ArrayList<T>([]);
    this.capacity = 0
  }

  public enqueue(data: T) {
    this.arrayList.add(data);
    this.capacity++;
  }

  public dequeue(): T {
    if (this.capacity == 0) return null as T;
    let dequeueItem = this.arrayList.at(0) as T;
    this.arrayList.remove(0);
    this.capacity--;
    return dequeueItem;
  }

  public peek(): T {
    const value = this.arrayList.at(0);
    return value === undefined ? (null as T) : value;
  }

  public get size(): number {
    return this.capacity;
  }

  public get isEmpty(): boolean {
    return this.capacity === 0;
  }

  public display() {
    console.log(`---------- START --------- \n`);
    for (let index = 0; index <= this.capacity - 1; index++) {
      process.stdout.write(`${this.arrayList.at(index)} <-- `);
    }
    console.log(`\n\n---------- END --------- \n`);
  }
}

export class QueueUsingLinkedList<T> {
  private head: Node<T> = null as unknown as Node<T>;
  private tail: Node<T> = null as unknown as Node<T>;
  private capacity = 0;

  public enqueue(data: T) {
    let newNode = new Node<T>(data);

    if (this.capacity == 0) {
      this.tail = newNode;
      this.head = this.tail;
      this.capacity++;
      return;
    }

    this.tail.next = newNode;
    this.tail = this.tail.next;
    this.capacity++;
  }

  public dequeue(): T {
    if (this.capacity == 0) return null as T;

    let data = this.head.data;
    this.head = this.head.next;
    this.capacity--;
    return data;
  }

  public get size(): number {
    return this.capacity;
  }

  public display() {
    console.log(`---------- START --------- \n`);
    let current = this.head;  
    while (current) {
      process.stdout.write(`${current.data} <-- `);
      current = current.next;
    }
    console.log(`\n\n---------- END --------- \n`);
  }
}


/// TESTSSSS

// let queue = new Queue<number>();

// queue.enqueue(3);
// queue.enqueue(5);
// queue.enqueue(7);
// queue.enqueue(9);
// queue.enqueue(11);
// queue.enqueue(13);
// queue.enqueue(15);
// queue.enqueue(17);

// queue.dequeue();
// queue.enqueue(3);
// queue.dequeue();
// queue.enqueue(0);

// queue.display();
// console.log(queue.size)
