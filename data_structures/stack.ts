export class Stack<T = unknown> {
  private capacity = 0;
  private array = new Array<T>(4);

  public pop(): T {
    if (this.capacity == 0) return null as unknown as T;

    let popped = this.array[this.capacity - 1];
    this.array[this.capacity - 1] = null as unknown as T;
    this.capacity--;
    return popped;
  }

  public push(data: T) {
    if (this.capacity == this.array.length) this.doubleCapacity();

    this.array[this.capacity] = data;
    this.capacity++;
  }

  public peek(): T {
    if (this.capacity == 0) return null as unknown as T;
    return this.array[this.capacity - 1];
  }

  public size(): number {
    return this.capacity;
  }

  private doubleCapacity() {
    let newCapacity = this.capacity * 2;
    let newArray = new Array<T>(newCapacity);
    for (let index = 0; index < this.array.length; index++) {
      newArray[index] = this.array[index];
    }
    this.array = newArray;
  }

  public get isEmpty(): boolean {
    return this.capacity == 0;
  }

  public display() {
    console.log(`---------- START --------- \n`);
    for (let index = this.capacity - 1; index >= 0; index--) {
      console.log(`Stack number ${index} -> ${this.array[index]}\n`);
    }
    console.log(`---------- END --------- \n\n`);
  }
}

//TESTSSSSSS
// let stack = new Stack<string>();

// stack.push("Onion")
// stack.push("Celery")
// stack.push("Watermelon")
// stack.push("lettuce")
// stack.push("Apple")
// stack.push("Cidar")
// stack.push("grape")
// // stack.push("Orange")
// // stack.push("Banana")
// // stack.pop();
// stack.pop();
// stack.pop();
// stack.push("Grover")
// let peekItem = stack.peek();

// // console.log(peekItem);
// stack.display()
