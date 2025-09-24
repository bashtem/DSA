import { ArrayList } from "./arraylist";

export abstract class Heap {
  protected leftChildIndex(index: number) {
    return 2 * index + 1;
  }

  protected rightChildIndex(index: number) {
    return 2 * index + 2;
  }

  protected parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }
}

// Binary heap is mostly used to implement a priority queue
export class MaxHeap<T = number> extends Heap {
  public heap: ArrayList<T>;

  public constructor(data: T[]) {
    super();
    this.heap = new ArrayList(data);
  }

  public insert(data: T) {
    this.heap.push(data);
    this.heapifyUp(this.heap.size - 1);
  }

  public remove(): T {
    let removedItem = this.heap.at(0);
    let lastItem = this.heap.at(this.heap.size - 1);
    this.heap.set(lastItem, 0);
    this.heap.pop();
    this.heapifyDown(0);
    return removedItem;
  }

  private heapifyUp(index: number) {
    while (true) {
      let parentVal = this.heap.at(this.parentIndex(index));

      if (index == 0 || parentVal >= this.heap.at(index)) break;

      this.heap.set(this.heap.at(index) as T, this.parentIndex(index));
      this.heap.set(parentVal, index);
      index = this.parentIndex(index);
    }
    return;
  }

  // Implementation using a recursive function call
  private heapifyDown(index: number) {
    let leftIndex = this.leftChildIndex(index);
    let rightIndex = this.rightChildIndex(index);

    if (leftIndex > this.heap.size) return;

    let largestIndex =
      this.heap.at(leftIndex) >= this.heap.at(rightIndex)
        ? leftIndex
        : rightIndex;

    if (this.heap.at(largestIndex) < this.heap.at(index)) return;
    let parentVal = this.heap.at(index);
    this.heap.set(this.heap.at(largestIndex), index);
    this.heap.set(parentVal, largestIndex);
    this.heapifyDown(largestIndex);
  }

  public buildMaxHeap() {
    if (this.heap.size == 0) return [];
    let lastNonLeafIndex = Math.floor(this.heap.size / 2) - 1;

    for (let index = lastNonLeafIndex; index >= 0; index--) {
      this.heapifyDown(index);
    }
    this.heap.display();
  }

  // Implementation using recusive function call
  // private heapifyUp(index: number) {
  //   let parentVal = this.heap.at(this.parentIndex(index)) as T;

  //   if (index != 0 && parentVal < this.heap.at(index)) {
  //     this.heap.set(this.heap.at(index) as T, this.parentIndex(index));
  //     this.heap.set(parentVal, index);
  //     this.heapifyUp(this.parentIndex(index));
  //   }
  // }

  // Method 2 implemntation using a while loop
  //   private heapifyDown(index: number) {
  //     while (true) {
  //       let leftIndex = this.left(index);
  //       let rightIndex = this.right(index);

  //       if (leftIndex > this.heap.size) break;

  //       let largestIndex =
  //         this.heap.at(leftIndex) >= this.heap.at(rightIndex)
  //           ? leftIndex
  //           : rightIndex;

  //       if (this.heap.at(largestIndex) < this.heap.at(index)) break;

  //       let parentVal = this.heap.at(index);
  //       this.heap.set(this.heap.at(largestIndex), index);
  //       this.heap.set(parentVal, largestIndex);
  //       index = largestIndex
  //     }

  //     return;
  //   }
}

export class MinHeap<T> extends Heap {
  private heap;

  public constructor(array: T[]) {
    super();
    this.heap = new ArrayList(array);
  }

  private heapifyUp(index: number) {
    let parentValue = this.heap.at(this.parentIndex(index));
    let childValue = this.heap.at(index);
    if (index > 0 && parentValue > childValue) {
      this.heap.set(childValue, this.parentIndex(index));
      this.heap.set(parentValue, index);
      this.heapifyUp(this.parentIndex(index));
    }
  }

  private heapifyDown(index: number) {
    let leftValue = this.heap.at(this.leftChildIndex(index));
    let rightValue = this.heap.at(this.rightChildIndex(index));
    let smallestIndex = index;

    if (
      this.leftChildIndex(index) < this.heap.size &&
      leftValue < this.heap.at(smallestIndex)
    )
      smallestIndex = this.leftChildIndex(index);
    if (
      this.rightChildIndex(index) < this.heap.size &&
      rightValue < this.heap.at(smallestIndex)
    )
      smallestIndex = this.rightChildIndex(index);

    if (smallestIndex === index) return;

    let smallestValue = this.heap.at(smallestIndex);
    this.heap.set(this.heap.at(index), smallestIndex);
    this.heap.set(smallestValue, index);
    this.heapifyDown(smallestIndex);
  }

  public buildMinHeap() {
    if (this.heap.size == 0) return [];

    let lastNonLeafIndex = Math.floor(this.heap.size / 2) - 1;
    for (let index = lastNonLeafIndex; index >= 0; index--) {
      this.heapifyDown(index);
    }
    this.heap.display();
  }
}

// let maxHeap = new MaxHeap([50,40,13,12,11,7,4,6,30,17])

// // heap.insert(43)

// // heap.buildMaxHeap();

// // heap.delete()

// let minHeap = new MinHeap([50,40,13,12,11,7,4,6,30,17])

// minHeap.buildMinHeap();
