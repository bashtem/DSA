function binarySearch(arr: number[], element: number) {
  let start = 0;
  let end = arr.length;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let midElement = arr[mid];

    if (midElement == element) return mid;

    if (midElement < element) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

let res = binarySearch([2, 5, 6, 7, 9, 11, 13, 14, 15, 17, 20, 21], 15);

console.log(res);