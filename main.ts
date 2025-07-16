import { Stack } from "./data_structures/stack";

let stack = new Stack<string>();

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

// console.log(`Peek Item -> ${peekItem}\n`);
// stack.display()

export function isBracketValid(brackets: string): boolean {
  let bracketsArray = [...brackets];
  let stack = new Stack<string>();
  let bracketsMap = new Map([
    ["[", "]"],
    ["{", "}"],
    ["(", ")"],
  ]);

  for (const index in bracketsArray) {
    let each = bracketsArray[index];
    console.log(`Number ${index} is -> ${each}\n`);

    let eachMap = bracketsMap.get(each);

    if (!eachMap && stack.isEmpty) return false;

    if (eachMap) {
      stack.push(each);
    } else if (each != bracketsMap.get(stack.pop())) {
      return false;
    }
  }

  if (!stack.isEmpty) return false;
  return true;
}

let res = isBracketValid("[{}]");

console.log(` Bracket composition is: ${res}`);
