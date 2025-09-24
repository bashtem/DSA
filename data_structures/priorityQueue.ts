import { ArrayList } from "./arraylist";
import { Heap } from "./heap";

export interface Entry<T> {
  data: T;
  priority: number;
}

export class PriorityQueue<T> extends Heap {
  private capacity: number;
  private heap: ArrayList<Entry<T>>;

  constructor() {
    super();
    this.heap = new ArrayList([]);
    this.capacity = 0;
  }

  enqueue(data: T, priority: number) {
    let entry: Entry<T> = { data, priority };
    this.heap.push(entry);
    this.capacity++;
    this.heapifyUp(this.capacity - 1);
  }

  dequeue(): Entry<T> {
    if (this.isEmpty) return null as unknown as Entry<T>;
    let removed = this.heap.at(0);
    this.heap.set(this.heap.pop(), 0);
    this.capacity--;
    this.heapifyDown(0);
    return removed;
  }

  heapifyUp(index: number) {
    if (this.isEmpty) return;

    while (true) {
      if (index <= 0) return;
      let parentIndex = this.parentIndex(index);
      let parent = this.heap.at(parentIndex);
      let child = this.heap.at(index);

      if (parent.priority < child.priority) return;

      this.heap.set(parent, index);
      this.heap.set(child, parentIndex);
      index = parentIndex;
    }
  }

  heapifyDown(index: number) {
    if (this.isEmpty || index >= this.capacity) return;
    let leftChildIndex = this.leftChildIndex(index);
    let leftChild = this.heap.at(leftChildIndex);

    if (!leftChild) return;

    let rightChildIndex = this.rightChildIndex(index);
    let rightChild = this.heap.at(rightChildIndex);

    let smallestChildIndex;

    if (!rightChild) smallestChildIndex = leftChildIndex;
    else {
      const { priority: leftPriority } = leftChild;
      const { priority: rightPriority } = rightChild;
      smallestChildIndex =
        leftPriority < rightPriority ? leftChildIndex : rightChildIndex;
    }

    let parent = this.heap.at(index);
    let smallestChild = this.heap.at(smallestChildIndex);

    if (parent.priority < smallestChild.priority) return;

    this.heap.set(parent, smallestChildIndex);
    this.heap.set(smallestChild, index);
    this.heapifyDown(smallestChildIndex);
  }

  get isEmpty(): boolean {
    return this.capacity === 0;
  }

  get size(): number {
    return this.capacity;
  }
}

//Test Example
// let pq = new PriorityQueue<string>();

// pq.enqueue("bashtem", 14);
// pq.enqueue("mother", 8);
// // pq.enqueue("aduni", 3);
// // pq.enqueue("bash", 0);
// // pq.enqueue("rahman", 2);
// // pq.enqueue("naheemah", 1);
// // pq.enqueue("taye", 12);
// // pq.enqueue("idowu", 20);

// console.log(pq.dequeue());
// console.log(pq.dequeue());
// // console.log(pq.dequeue());
// // console.log(pq.dequeue());
