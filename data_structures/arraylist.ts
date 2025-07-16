export interface List<T> {
  add(data: T, index: number): void;
  remove(index: number): T;
  at(index: number): T | undefined;
  get size(): number;
  push?(data: T): void;
  pop?(): T;
  find?(element: T): number;
  isEmpty?(): boolean;
}

export class ArrayList<T = unknown> implements List<T> {
  private readonly DEFAULT_LENGTH = 4;
  private capacity = 0;
  private array: T[];

  constructor(...datas: T[]) {
    let elementLength = datas.length;
    if (elementLength == 0) {
      this.array = Array<T>(this.DEFAULT_LENGTH);
      return;
    }
    this.array = Array(elementLength);
    for (let index = 0; index < elementLength; index++) {
      this.array[this.array.length] = datas[index];
    }
  }

  public add(data: T, index?: number): void {
    if (index != null && (index < 0 || index > this.capacity)) return;

    if (this.capacity == this.array.length) {
      let newArray = Array(this.array.length * 2);
      for (let index = 0; index < this.array.length; index++) {
        newArray[index] = this.array[index];
      }
      this.array = newArray;
    }

    if (index == null || index == this.capacity) {
      this.array[this.capacity] = data;
      this.capacity++;
      return;
    }

    for (let i = this.capacity - 1; i >= index; i--)
      this.array[i + 1] = this.array[i];

    this.array[index] = data;
    this.capacity++;
  }

  public remove(index: number): T {
    if (index < 0 || index >= this.capacity) return null as T;

    let deletedItem = this.array[index];

    for (let i = index; i < this.capacity - 1; i++)
      this.array[i] = this.array[i + 1];

    this.array[this.capacity - 1] = null as T;
    this.capacity--;
    return deletedItem;
  }

  public at(index: number): T | undefined {
    if (index < 0 || index >= this.capacity) return null as T;
    return this.array[index];
  }

  public push(data: T): void {
    this.add(data, this.capacity);
  }

  public pop(): T {
    return this.remove(this.capacity - 1);
  }

  get size(): number {
    return this.capacity;
  }

  public isEmpty(): boolean {
    return this.capacity == 0;
  }

  public display(): void {
    if (this.capacity == 0) console.log("Array is Empty");

    console.log(`--------------- START ---------------`)
    for (let index = 0; index < this.capacity; index++) {
      console.log(`Item -> ${this.array[index]}\n`);
    }
    console.log(`--------------- END ---------------\n`)
  }
}

// TESTSSSSS
// let items: ArrayList<number> = new ArrayList();

// console.log(items.isEmpty());

// items.add(20);
// items.add(30);
// items.add(50);
// items.add(10);
// items.add(80);
// items.display();
// items.remove(2);
// items.display();
// items.push(100)
// items.push(200)
// items.display()
// items.remove(0);
// items.display()
// items.pop()
// items.display()
// items.push(320);
// items.display()
// console.log(items.isEmpty());
// console.log("Items size -> "+items.size);
// console.log("First Item -> "+ items.at(0));
// console.log("Last Item -> "+ items.at(4));
