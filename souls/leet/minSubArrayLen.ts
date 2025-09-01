/**
 * Sliding Window - minSubArrayLen
Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.

This function should return the minimal length of a contiguous subarray of which the sum is greater than
 or equal to the integer passed to the function. If there isn't one, return 0 instead.
Examples:

minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
minSubArrayLen([1,4,16,22,5,7,8,9,10],39) // 3
minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0
Time Complexity - O(n)

Space Complexity - O(1)
 */

function minSubArrayLen(arr: number[], n: number) {
  let minLen = Infinity;
  let acc = 0;
  let leftPointer = 0;
  let rightPointer = 0;

  while (rightPointer < arr.length) {
    const item = arr[rightPointer];

    if (item >= n) return 1;

    if (acc < n) acc += item;

    if (acc >= n) {
      minLen = Math.min(minLen, rightPointer - leftPointer + 1);
      acc-= arr[leftPointer];
      leftPointer++;
    }

    if (acc < n) rightPointer++;
  }

  return minLen == Infinity ? 0 : minLen;
}
