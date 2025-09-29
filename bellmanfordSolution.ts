// You're building a decentralized trading platform that allows users to swap tokens.
// Behind the scenes, swaps can take multiple hops through intermediary tokens to find the most optimal route that gives users the best output.
// Your task is to complete the core logic to compute the most profitable swap path and answer follow-up questions based on your code.

import kleur from "kleur";
import { WeightedGraph } from "./data_structures/graph";

// 1 - Complete the findBestSwapPath function in the provided code.
// 2 - Do not modify the structure or logic outside this function.
// 3 - If no path exists, return an empty array and amount = 0

// Sample Input:
//   ETH MATIC

// Sample Output:
//   Optimal Swap Route: ETH, USDC, DAI, MATIC
//   Amount: 479978.95 MATIC

function findBestSwapPath(
  g: WeightedGraph,
  fromToken: string,
  toToken: string,
  amount: number
) {
  const tokens = g.adjacencyList;
  let distances: { [key: string]: { distance: number; prev: string | null } } =
    {};
  for (const [token, edges] of tokens) {
    distances[token] = { distance: Infinity, prev: null };
  }
  distances[fromToken] = { distance: 0, prev: null };

  // FIRST METHOD FOR COST RELAXATION
  // for (let i = 0; i < tokens.size - 1; i++) {
  //   for (const [token, edges] of g.adjacencyList) {
  //     for (const { neighbour, weight } of edges) {
  //       let tokenCost = distances[token].distance + weight;
  //       let neighborCost = distances[neighbour].distance;
  //       if (tokenCost < neighborCost) {
  //         distances[neighbour] = { distance: tokenCost, prev: token };
  //       }
  //     }
  //   }
  // }

  // ALTERNATIVELY FOR COST RELAXATION
  for (let i = 0; i < tokens.size - 1; i++) {
    for (const { u: token, v: neighbour, weight } of g.edges()) {
      let tokenCost = distances[token].distance + weight;
      let neighborCost = distances[neighbour].distance;
      if (tokenCost < neighborCost) {
        distances[neighbour] = { distance: tokenCost, prev: token };
      }
    }
  }

  let vtx = distances[toToken];
  amount = distances[toToken].distance;
  let path = [toToken];

  while (vtx) {
    if (vtx.prev) path = [vtx.prev, ...path];
    vtx = distances[vtx.prev as string];
  }

  return {
    path,
    amount,
  };
}

function getGraph(
  edges: { from: string; to: string; rate: number; fee: number }[]
) {
  const graph = new WeightedGraph({ directed: true });

  for (const edge of edges) {
    graph.addVertex(edge.from);
    graph.addVertex(edge.to);
  }

  for (const edge of edges) {
    graph.addEdge(
      edge.from,
      edge.to,
      // Using the logarithm to turn multiplication into addition (a * b = Math.exp(Math.log(a) + Math.log(b)))
      -Math.log(edge.rate * (1 - edge.fee))
    );
  }

  return graph;
}

function bestTokenSwap(fromToken: string, toToken: string) {
  const edges = [
    { from: "ETH", to: "MATIC", rate: 40000, fee: 0.005 },
    { from: "ETH", to: "USDC", rate: 1800, fee: 0.003 },
    { from: "USDC", to: "DAI", rate: 1, fee: 0.001 },
    { from: "DAI", to: "MATIC", rate: 0.72, fee: 0.002 },
    { from: "ETH", to: "WBTC", rate: 14, fee: 0.002 },
    { from: "WBTC", to: "DAI", rate: 48000, fee: 0.004 },
    { from: "ETH", to: "AVAX", rate: 70, fee: 0.005 },
    { from: "AVAX", to: "DAI", rate: 25, fee: 0.003 },
  ];

  let graph = getGraph(edges);
  // console.log(graph);

  console.log(kleur.italic("Searching for optimal swap route ..."));

  const { path, amount: outputAmount } = findBestSwapPath(
    graph,
    fromToken,
    toToken,
    1
  );

  const res = graph.bellmanfordTraversal(fromToken, toToken);

  console.log(kleur.green(`\nOptimal Swap Route: ${res?.result}`));
  console.log(kleur.green(`\nOptimal Swap Route: ${path.join(", ")}`));
  console.log(
    kleur.green(`Amount: ${Number(res?.totalDistance).toFixed(2)} ${toToken}`)
  );
  console.log(
    kleur.green(`Amount: ${Number(outputAmount).toFixed(2)} ${toToken}`)
  );
}

bestTokenSwap("ETH", "DAI");
