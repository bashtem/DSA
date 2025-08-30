const slowFib = (n: number): number => {
  if (n < 2) return n;

  return fib(n - 1) + fib(n - 2);
}


// We could use memoization to improve the function performance from O(2^N) exponential runtime to O(N) linear runtime
// Memoization is a technique that enhances the performance of recursive algorithms by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

export function memoize<T extends (...args: any[]) => any>(fn: T) {
  let cache = new Map();

  return  function<T>(this: any, ...args: T[]){
    const key = JSON.stringify(args); // Use a string key for argument arrays
    if (cache.has(key)) return cache.get(key)!;

    let result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

export let fib = memoize(slowFib);

//Usage

fib<number>(4)