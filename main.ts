// You're building a decentralized trading platform that allows users to swap tokens.
// Behind the scenes, swaps can take multiple hops through intermediary tokens to find the most optimal route that gives users the best output.
// Your task is to complete the core logic to compute the most profitable swap path and answer follow-up questions based on your code.

import { WeightedGraph } from "./data_structures/graph";

// 1 - Complete the findBestSwapPath function in the provided code.
// 2 - Do not modify the structure or logic outside this function.
// 3 - If no path exists, return an empty array and amount = 0

// Sample Input:
//   ETH MATIC

// Sample Output:
//   Optimal Swap Route: ETH, USDC, DAI, MATIC
//   Amount: 479978.95 MATIC

function findBestSwapPath(g, fromToken, toToken, amount) {
  /** TODO: Complete the function*/

  const tokens = g.nodes();

  const distances = {};

  for (const token of tokens) {
    distances[token] = Infinity;
  }

  distances[fromToken] = 0;

  for (let i = 0; i < tokens.length - 1; i++) {
    for (const { v: from, w: to } of g.edges()) {
      const weight = g.edge(from, to);

      if (distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
      }
    }
  }

  return {
    path: [],
    amount,
  };
}

function getGraph(edges: any) {
  const graph = new WeightedGraph();

  for (const edge of edges) {
    graph.setEdge(
      edge.from,
      edge.to,
      // Using the logarithm to turn multiplication into addition (a * b = Math.exp(Math.log(a) + Math.log(b)))
      -Math.log(edge.rate * (1 - edge.fee))
    );
  }

  return graph;
}

function bestTokenSwap() {
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

  const input = prompt(
    "Enter start token and destination token: "
  ).toUpperCase();
  const [fromToken, toToken] = input.split(" ");

  console.log(kleur.italic("Searching for optimal swap route ..."));

  const { path, amount: outputAmount } = findBestSwapPath(
    g,
    fromToken,
    toToken,
    1
  );

  console.log(kleur.green(`\nOptimal Swap Route: ${path.join(", ")}`));
  console.log(
    kleur.green(`Amount: ${Number(outputAmount).toFixed(2)} ${toToken}`)
  );
}

bestTokenSwap();
