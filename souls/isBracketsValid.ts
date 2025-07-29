import { Stack } from "../data_structures/stack";

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

  return stack.isEmpty;
}

let res = isBracketValid("[{}]");

console.log(` Bracket composition is: ${res}`);
