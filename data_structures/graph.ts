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
    let visited = new Set<T>();
    let result = new Array<T>();
    stack.push(node);

    while (!stack.isEmpty) {
      let vertex = stack.pop();
      result.push(vertex as T);
      visited.add(vertex);

      this.adjacencyList.get(vertex)?.forEach((neighbour) => {
        if (!visited.has(neighbour)) stack.push(neighbour);
      });
    }
    return result;
  }

  bfsTraversal(node: T) {
    let queue = new Queue<T>();
    let visited = new Set<T>();
    let result = new Array<T>();
    queue.enqueue(node);

    while (!queue.isEmpty) {
      let vertex = queue.dequeue();
      result.push(vertex);
      visited.add(vertex);

      this.adjacencyList.get(vertex)?.forEach((neighbour) => {
        if (!visited.has(neighbour)) queue.enqueue(neighbour);
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
  neighbour: T;
  weight: number;
}

export class WeightedGraph<T = string> {
  adjacencyList: Map<T, Set<WeightedEdge<T>>>;
  directed: boolean;

  constructor(options?: { directed: boolean }) {
    this.adjacencyList = new Map();
    this.directed = (options?.directed as boolean) ?? false;
  }

  addVertex(vertex: T) {
    this.adjacencyList.set(vertex, new Set());
  }

  removeVertex(vertex: T) {
    this.adjacencyList
      .get(vertex)
      ?.forEach(({ neighbour, weight }) =>
        this.removeEdge(vertex, neighbour, weight)
      );

    this.adjacencyList.delete(vertex);
  }

  addEdge(u: T, v: T, weight: number) {
    this.adjacencyList.get(u)?.add({ neighbour: v, weight });
    if (!this.directed)
      this.adjacencyList.get(v)?.add({ neighbour: u, weight });
  }

  removeEdge(u: T, v: T, weight: number) {
    this.adjacencyList.get(u)?.delete({ neighbour: v, weight });
    if (!this.directed)
      this.adjacencyList.get(v)?.delete({ neighbour: u, weight });
  }

  edges() {
    let result: Array<{ u: T; v: T; weight: number }> = new Array();
    for (const [vtx, edges] of this.adjacencyList) {
      edges.forEach(({ neighbour, weight }) => {
        result.push({ u: vtx, v: neighbour, weight });
      });
    }
    return result;
  }

  edge(u: T, v: T) {
    let uvWeight;
    let uEdges = this.adjacencyList.get(u);
    uEdges?.forEach(({ neighbour, weight }) => {
      if (v === neighbour) uvWeight = weight;
    });
    return uvWeight;
  }

  dijkstraTraversal(startVertex: T, endVertex: T) {
    // initialize a hashmap to store each vertex distance to the end vertex and the connecting vertex named "previous".
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

      this.adjacencyList.get(vtx)?.forEach(({ neighbour, weight }) => {
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

    while (vtx) {
      if (vtx.previous !== null) result = [vtx.previous, ...result];
      vtx = distances.get(vtx.previous as T);
    }
    return { totalDistance, result };
  }

  bellmanfordTraversal(startVtx: T, endVtx: T) {
    // Bellman ford Algorithm doesn't consider the Vertex with the smallest diatnce in the distance table unlike Dijkstra's Algorithm
    let distances = new Map<T, { distance: number; previous: T | null }>();

    // initialize the distances table i.e intialize the costs and previous vertex
    // Set cost[s] = 0 (Source), cost[v] = Infinity (others) and previous[v] = Null
    for (const vtx of this.adjacencyList.keys()) {
      if (vtx == startVtx) distances.set(vtx, { distance: 0, previous: null });
      else distances.set(vtx, { distance: Infinity, previous: null });
    }

    // We use this to track for distance update within an iteration to end the remaining iterations if not update occur.
    let isRelaxed;
    let iterations = this.adjacencyList.size - 1;

    // Relax all Edges Repeatedly for (V-1) TImes:
    for (let i = 0; i < iterations; i++) {
      isRelaxed = false;
      // iterate each vertex in the adjacency list
      for (const [vtx, edges] of this.adjacencyList) {
        // iterate all edges for the selected vertex in the adjacency list
        for (const { neighbour, weight } of edges) {
          let newDistance = (distances.get(vtx)?.distance as number) + weight;
          let neighborDist = distances.get(neighbour)?.distance as number; // neighbour Distance
          if (neighborDist > newDistance) {
            distances.set(neighbour, { distance: newDistance, previous: vtx });
            isRelaxed = true;
          }
        }
      }
      if (!isRelaxed) break;
    }

    // Check for Negative-weight cycles.
    if (isRelaxed)
      for (const [vtx, edges] of this.adjacencyList) {
        for (const { neighbour, weight } of edges) {
          let vtxCost = (distances.get(vtx)?.distance as number) + weight;
          if ((distances.get(neighbour)?.distance as number) > vtxCost) {
            console.log("Graph contains negative weight cycle");
            return;
          }
        }
      }

    //build the shortest route from endVertex to startVertex using the distances hashmap
    let vtx = distances.get(endVtx);
    if (!vtx) return;

    let totalDistance = vtx.distance;
    let result = [endVtx];

    while (vtx) {
      if (vtx.previous !== null) result = [vtx.previous, ...result];
      vtx = distances.get(vtx.previous as T);
    }
    return { totalDistance, result };
  }
}
