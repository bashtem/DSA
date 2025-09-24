import { Entry, PriorityQueue } from "./priorityQueue";
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

//  * Example Test
// let g = new Graph();

// g.addVertex("bashtem")
// g.addVertex("motunrayo")
// g.addVertex("madinah")
// g.addVertex("naheemah")
// g.addVertex("rahman")

// g.addEdge("bashtem", "rahman")
// g.addEdge("bashtem", "naheemah")
// g.addEdge("bashtem", "madinah")
// g.addEdge("madinah", "rahman" )
// g.addEdge("madinah", "naheemah" )
// g.addEdge("bashtem", "motunrayo")
// g.addEdge("naheemah", "rahman" )

// console.log(g)
// let res = g.bfsTraversal("bashtem")
// console.log(res)

interface WeightedEdge<T> {
  node: T;
  weight: number;
}

export class WeightedGraph<T = string> {
  private adjacencyList: Map<T, Set<WeightedEdge<T>>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: T) {
    this.adjacencyList.set(vertex, new Set());
  }

  removeVertex(vertex: T) {
    this.adjacencyList
      .get(vertex)
      ?.forEach(({ node, weight }) => this.removeEdge(vertex, node, weight));

    this.adjacencyList.delete(vertex);
  }

  addEdge(u: T, v: T, weight: number, directed = false) {
    this.adjacencyList.get(u)?.add({ node: v, weight });
    if (!directed) this.adjacencyList.get(v)?.add({ node: u, weight });
  }

  removeEdge(u: T, v: T, weight: number, directed = false) {
    this.adjacencyList.get(u)?.delete({ node: v, weight });
    if (!directed) this.adjacencyList.get(v)?.delete({ node: u, weight });
  }

  dijkstraTraversal(startVertex: T, endVertex: T) {
    // initialize a hashmap to store each vertex distance to the end vertex and the connecting vertex call previous.
    // e.g {A: {distance: 0, previous: null}}, {B: {distance: Infinity, previous: null}}
    const distances = new Map<T, { distance: number; previous: T | null }>();
    // initialize a Priority Queue to store each vertices distance from smallest.
    const pq = new PriorityQueue<T>();
    // initialise a Set to keep track of visited vertices.
    const visited = new Set<T>();

    //initialise distances hashmap
    for (let vtx of this.adjacencyList.keys()) {
      if (vtx === startVertex)
        distances.set(vtx, { distance: 0, previous: null });
      else distances.set(vtx, { distance: Infinity, previous: null });
    }

    // We start our traversal from the start vertex with distance to itself set to Zero
    pq.enqueue(startVertex, 0);

    while (!pq.isEmpty) {
      let { data: vtx, priority: vtxWeight }: Entry<T> = pq.dequeue();
      visited.add(vtx);

      this.adjacencyList.get(vtx)?.forEach(({ node: neighbour, weight }) => {
        if (!visited.has(neighbour)) {
          let newDistance = vtxWeight + weight;
          if ((distances.get(neighbour)?.distance as number) > newDistance) {
            distances.set(neighbour, { distance: newDistance, previous: vtx });
            pq.enqueue(neighbour, newDistance);
          }
        }
      });
    }

    //build the shortest route from endVertex to startVertex using the distances hashmap
    let vtx = distances.get(endVertex);
    if (!vtx) return;

    let totalDistance = vtx.distance;
    let result = [endVertex];

    while (vtx?.previous !== null) {
      result = [vtx?.previous as T, ...result];
      if (vtx && vtx.previous) vtx = distances.get(vtx?.previous);
    }
    return { totalDistance, result };
  }
}
