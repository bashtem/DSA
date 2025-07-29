
export interface IQueue<T =any> {
  enqueue(item: T): number;
  dequeue(): T;
  size(): number;
}

interface IStack<T =any> {
  push(item: T): number;
  pop(): T | undefined;
  get length(): number;
}


class Queue<T = any> extends Array<T> implements IQueue{

  public constructor(){
    super()
  }

  public enqueue(item: T): number{
    return super.push(item)
  }

  public dequeue(): T{
    return super.shift() as T;
  }

  public size(): number{
    return super.length;
  }

}


let stack: IStack<number> = new Array<number>();

stack.push(4)
stack.push(5)
stack.push(9)
stack.pop()
stack.pop()

console.log(stack.length)


// queue.enqueue(3);
// queue.enqueue(5);
// queue.enqueue(7);
// queue.enqueue(9);
// queue.enqueue(11);
// queue.enqueue(13);
// queue.enqueue(15);
// queue.enqueue(17);

// // queue.dequeue();
// queue.enqueue(3);
// // queue.dequeue();
// queue.enqueue(0);

// console.log(queue.size())

let x  = new Array()
// x.po