// Frequency Counter Pattern

export function same(arr: number[], sqredArr: number[]) {
  if (arr.length !== sqredArr.length) return false;

  for (const item of arr) {
    let sqred = item ** 2;

    let squaredIndex = sqredArr.indexOf(sqred);

    if (squaredIndex == -1) return false;

    sqredArr.splice(squaredIndex, 1);
  }

  return true;
}

export function mapOccurence(arr: number[], map: Map<number, number>) {
  arr.forEach((each) => {
    let count = map.has(each) ? (map.get(each) ?? 0) + 1 : 1;
    map.set(each, count);
  });
}

export function sameOptimized(arr: number[], sqredArr: number[]) {
  if (arr.length !== sqredArr.length) return false;

  let arrOccurrence = new Map();

  let sqredArrOccurrence = new Map();

  mapOccurence(arr, arrOccurrence);

  mapOccurence(sqredArr, sqredArrOccurrence);

  for (const [key, count] of arrOccurrence) {
    let sqredKey = key ** 2;
    if (!sqredArrOccurrence.has(sqredKey)) return false;

    if (sqredArrOccurrence.get(sqredKey) !== count) return false;
  }

  return true;
}

// let result = same([1, 2, 1], [4, 4, 1]);

let y = sameOptimized([1, 2, 1], [4, 4, 1]);

console.log(y);


// Runtime Test for O(n) vs O(n^2)

let a = Array(100000).fill(0).map((each, idx) => idx+1)
let b = a.map((each, idx) => each**2 )

console.time("Ops-runtime")

let result = same(a, b);

// let result = sameOptimized(a, b);

console.log(result);

console.timeEnd("Ops-runtime")
