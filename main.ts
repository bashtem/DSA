import { Graph, WeightedGraph } from "./data_structures/graph";
import { PriorityQueue } from "./data_structures/priorityQueue";

let g = new WeightedGraph();

g.addVertex("a");
g.addVertex("b");
g.addVertex("c");
g.addVertex("d");
g.addVertex("e");

g.addEdge("a", "b", 3);
g.addEdge("a", "c", 2);
g.addEdge("a", "e", 4);
g.addEdge("b", "c", 8);
g.addEdge("c", "d", 1);
g.addEdge("d", "e", 3);

console.log(g);

let dist = g.dijkstraTraversal("d", "a");
console.log(dist)