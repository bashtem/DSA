// Merge sort is a divide-and-conquer algorithm used for sorting an array. Here's a breakdown of how merge sort works:
// Divide: The array is divided into two halves until each sub-array contains a single element. This is achieved through recursive calls.
// Conquer: Each of these single-element arrays is considered sorted. The next step involves merging these sorted arrays.
// Merge: The merging process combines two sorted arrays into one sorted array. This is done by comparing the elements of both arrays and arranging them in order.

export function merge(left: [], right: []) {
  let res = new Array();
  let i = 0;
  while (left.length && right.length) {
    if (left[i] > right[i]) {
      res.push(right.shift()); // :Todo Optimize shift
    } else {
      res.push(left.shift());
    }
  }

  return [...res, ...left, ...right];
}

export function mergeSort<T>(arr: Array<T>): any {
  if (arr.length === 1) return arr;

  let midpoint = Math.floor(arr.length / 2);
  let left = arr.slice(0, midpoint);
  let right = arr.slice(midpoint);

  return merge(mergeSort(left), mergeSort(right));
}
