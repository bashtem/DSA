import { Queue } from "./queue";
import { Stack } from "./stack";

export class Graph<T = string> {
  private adjacencyList: Map<T, Set<T>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: T) {
    this.adjacencyList.set(vertex, new Set<T>());
  }

  removeVertex(vertex: T) {
    this.adjacencyList.get(vertex)?.forEach((v) => this.removeEdge(vertex, v));

    this.adjacencyList.delete(vertex);
  }

  addEdge(u: T, v: T, directed = false) {
    this.adjacencyList.get(u)?.add(v);
    if (!directed) this.adjacencyList.get(v)?.add(u);
  }

  removeEdge(u: T, v: T, directed = false) {
    this.adjacencyList.get(u)?.delete(v);
    if (!directed) this.adjacencyList.get(v)?.delete(u);
  }

  get edgeList() {
    // Object.assign is done to prevent adjacencyList mutation from outside the class
    return Object.assign(this.adjacencyList);
  }

  dfsTraversal(node: T) {
    let stack = new Stack<T>();
    let visitedSet = new Set<T>();
    let result = new Array<T>();
    stack.push(node);
    visitedSet.add(node);

    let vertex;
    while (!stack.isEmpty) {
      vertex = stack.pop();
      result.push(vertex as T);

      this.adjacencyList.get(vertex)?.forEach((neighbour) => {
        if (!visitedSet.has(neighbour)) {
          stack.push(neighbour);
          visitedSet.add(neighbour);
        }
      });
    }
    return result;
  }

  bfsTraversal(node: T) {
    let queue = new Queue<T>();
    let visitedSet = new Set();
    let result = new Array();
    queue.enqueue(node);
    visitedSet.add(node);

    let vertex;
    while (!queue.isEmpty) {
      vertex = queue.dequeue();
      result.push(vertex);

      this.adjacencyList.get(vertex)?.forEach((neighbour) => {
        if (!visitedSet.has(neighbour)) {
          queue.enqueue(neighbour);
          visitedSet.add(neighbour);
        }
      });
    }
    return result;
  }
}

export class WeightedGraph<T = string> {
  private adjacencyList: Map<T, Set<T>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: T) {
    this.adjacencyList.set(vertex, new Set<T>());
  }

  removeVertex(vertex: T) {
    this.adjacencyList.get(vertex)?.forEach((v) => this.removeEdge(vertex, v));

    this.adjacencyList.delete(vertex);
  }

  addEdge(u: T, v: T, directed = false) {
    this.adjacencyList.get(u)?.add(v);
    if (!directed) this.adjacencyList.get(v)?.add(u);
  }

  removeEdge(u: T, v: T, directed = false) {
    this.adjacencyList.get(u)?.delete(v);
    if (!directed) this.adjacencyList.get(v)?.delete(u);
  }
}

//  * Example Test
// let g = new Graph<User>();

// g.addVertex(new UserBuilder(9071592141, "Taiwo Basit", "topeadebass@yahoo.com", Sex.M).setAge(35).build())
// g.addVertex(new UserBuilder(8038605660, "Abosede Motunrayo", "tunranyo@yahoo.com", Sex.F).build())
// g.addVertex(new UserBuilder(7081509981, "Madinah Olakeji", "sirlammadinah@gmail.com", Sex.F).build())
// g.addVertex(new UserBuilder(9071592142, "Naheemah Taiwo Basit", "naheemah@yahoo.com", Sex.M).build())
// g.addVertex(new UserBuilder(9071592143, "Abdul Rahman Taiwo", "rahman@yahoo.com", Sex.M).build())

// g.addEdge(9071592141, 9071592143)
// g.addEdge(9071592141, 9071592142)
// g.addEdge(9071592141, 7081509981)
// g.addEdge(7081509981, 9071592143 )
// g.addEdge(7081509981, 9071592142 )
// g.addEdge(9071592141, 8038605660)
// g.addEdge(9071592142, 9071592143 )

// console.log(g)

// // let res = g.bfsTraversal(7081509981)
// // console.log(res)
