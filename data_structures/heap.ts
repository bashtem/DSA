import { ArrayList } from "./arraylist";

class Heap {
  protected left(index: number) {
    return 2 * index + 1;
  }

  protected right(index: number) {
    return 2 * index + 2;
  }

  protected parent(index: number) {
    return Math.floor((index - 1) / 2);
  }
}

export class MaxHeap<T> extends Heap {
  private heap: ArrayList<T>;

  public constructor(data: T[]) {
    super();
    this.heap = new ArrayList(data);
  }

  public insert(data: T) {
    this.heap.push(data);
    this.heapifyUp(this.heap.size - 1);
    this.heap.display();
  }

  public remove(): T {
    let removedItem = this.heap.at(0);
    let lastItem = this.heap.at(this.heap.size - 1);
    this.heap.set(lastItem, 0);
    this.heap.pop();
    this.heapifyDown(0);
    this.heap.display();
    return removedItem;
  }

  // Implementation using recusive function call
  // private heapifyUp(index: number) {
  //   let parentVal = this.heap.at(this.parent(index)) as T;

  //   if (index != 0 && parentVal < this.heap.at(index)) {
  //     this.heap.set(this.heap.at(index) as T, this.parent(index));
  //     this.heap.set(parentVal, index);
  //     this.heapifyUp(this.parent(index));
  //   }
  // }

  private heapifyUp(index: number) {
    while (true) {
      let parentVal = this.heap.at(this.parent(index));

      if (index == 0 || parentVal >= this.heap.at(index)) break;

      this.heap.set(this.heap.at(index) as T, this.parent(index));
      this.heap.set(parentVal, index);
      index = this.parent(index);
    }
    return;
  }

  // Implementation using a recursive function call
  private heapifyDown(index: number) {
    let heapSize = this.heap.size;
    let leftIndex = this.left(index);
    let rightIndex = this.right(index);
    let largest = index;

    if (leftIndex < heapSize && this.heap.at(leftIndex) > this.heap.at(largest))
      largest = leftIndex;

    if (
      rightIndex < heapSize &&
      this.heap.at(rightIndex) > this.heap.at(largest)
    )
      largest = rightIndex;

    if (index != largest) {
      let parentVal = this.heap.at(index);
      this.heap.set(this.heap.at(largest), index);
      this.heap.set(parentVal, largest);
      this.heapifyDown(largest);
    }
    return;
  }

  // Method 2 implemntation using a while loop
  //   private heapifyDown(index: number) {
  //     while (true) {
  //       let leftIndex = this.left(index);
  //       let rightIndex = this.right(index);

  //       if (leftIndex > this.heap.size) break;

  //       let largest =
  //         this.heap.at(leftIndex) >= this.heap.at(rightIndex)
  //           ? leftIndex
  //           : rightIndex;

  //       if (this.heap.at(largest) < this.heap.at(index)) break;

  //       let parentVal = this.heap.at(index);
  //       this.heap.set(this.heap.at(largest), index);
  //       this.heap.set(parentVal, largest);
  //     }

  //     return;
  //   }

  public buildMaxHeap() {
    if (this.heap.size == 0) return [];
    let lastNonLeafIndex = Math.floor(this.heap.size / 2) - 1;

    for (let index = lastNonLeafIndex; index >= 0; index--) {
      this.heapifyDown(index);
    }
    this.heap.display();
  }
}

export class MinHeap<T> extends Heap {
  private heap;

  public constructor(array: T[]) {
    super();
    this.heap = new ArrayList(array);
  }

  private heapifyUp(index: number) {
    let parentValue = this.heap.at(this.parent(index));
    let childValue = this.heap.at(index);
    if (index > 0 && parentValue > childValue) {
      this.heap.set(childValue, this.parent(index));
      this.heap.set(parentValue, index);
      this.heapifyUp(this.parent(index));
    }
  }

  private heapifyDown(index: number) {
    let leftValue = this.heap.at(this.left(index));
    let rightValue = this.heap.at(this.right(index));
    let smallestIndex = index;

    if (
      this.left(index) < this.heap.size &&
      leftValue < this.heap.at(smallestIndex)
    )
      smallestIndex = this.left(index);
    if (
      this.right(index) < this.heap.size &&
      rightValue < this.heap.at(smallestIndex)
    )
      smallestIndex = this.right(index);

    if (smallestIndex != index) {
      let smallestValue = this.heap.at(smallestIndex);
      this.heap.set(this.heap.at(index), smallestIndex);
      this.heap.set(smallestValue, index);
      this.heapifyDown(smallestIndex);
    }
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
