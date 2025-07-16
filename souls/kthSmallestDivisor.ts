/**Write a program to find the K-th smallest divisor of a natural number N
 *
 * For example
 * Input N = 18, K = 4
 * Output: 6
 *
 * (The divisor of 18 are 1,2,3,6,9 and 18; where 1st smallest divisor is 1,
 * 2nd smallest divisor is 2, Similarly the 4th smallest divisor is 6)
 *
 * Input N = 16, K=3
 * Output: 4
 */

export function kthSmallestDivisor(value: number, kthDivisor: number): number {
  if (value == 1) return -1;

  let result: number = -1;
  let counter: number = 0;

  for (let divisor = 1; divisor <= value; divisor++) {
    if (value % divisor == 0) {
      counter++;
      if (counter == kthDivisor) {
        result = divisor;
        break;
      }
    }
  }
  return result;
}

console.log(kthSmallestDivisor(16, 3));
