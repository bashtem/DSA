import { DoublyLinkedList, LinkedList } from "./data_structures/linkedlist";
import { BinarySearchTree } from "./data_structures/trees";

let bst = new BinarySearchTree()

let res = bst.insert(50);
bst.insert(43)
bst.insert(55)
bst.insert(58)
bst.insert(40)
bst.insert(40)
bst.insert(10)
bst.insert(15)
bst.insert(150)
bst.insert(54)
bst.insert(53)

console.log(res)


console.log(bst.search(58))