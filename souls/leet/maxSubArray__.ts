// Dynamic Programming
// This problem falls under the dynamic programming category 
// because we are storing the solution of sub-problems and solving the larger problem 
// using the solution of smaller sub-problems.


// Solution Idea
/** NB: i-1 is the index before i. if i = 3, then  i-1 = 2
 *  if arr[i - 1] > 0, we need to include arr[i - 1] to calculate arr[i]. 
 *  The idea is simple: arr[i - 1] + arr[i] will be always greater than arr[i].
 *  So in this case, we update sum = arr[i-1] + arr[i] then update Max
 * 
 *  if arr[i - 1] < 0, we need to ignore arr[i -1],
 *  because arr[i - 1] + arr[i] will be always less than arr[i].
 *  So we just update sum = arr[i] then update Max
 * 
 * [-2,1,-3,4,-1,2,1,-5,4]  max = 6
 */

function maxSubArray(nums: number[]): number {
  if(nums.length == 1) return nums[0];
  let max = nums[0];
  let acc = max

  for (let index = 1; index < nums.length; index++) {
    const element = nums[index];
    acc = Math.max(element, acc + element)
    max = Math.max(acc, max)
  }
  return max;
}



function maxSubArray2(nums: number[]): number {
    let res = nums[0];
    let currSum = 0;

    for (const num of nums) {
        if (currSum < 0) { // this condition will ignore previous array value of accumulation if less than zero
            currSum = 0;
        }
        currSum += num;
        res = Math.max(res, currSum);
    }
    return res;
};