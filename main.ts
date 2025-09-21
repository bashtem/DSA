import { Graph } from "./data_structures/graph";

let g = new Graph();

g.addVertex("bashtem")
g.addVertex("motunrayo")
g.addVertex("madinah")
g.addVertex("naheemah")
g.addVertex("rahman")

g.addEdge("bashtem", "rahman")
g.addEdge("bashtem", "naheemah")
g.addEdge("bashtem", "madinah")
g.addEdge("madinah", "rahman" )
g.addEdge("madinah", "naheemah" )
g.addEdge("bashtem", "motunrayo")
g.addEdge("naheemah", "rahman" )

console.log(g)


export function dijkstraTraversal(){

}