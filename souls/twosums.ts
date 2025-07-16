// find the sum of two numbers that is equal to the target and return the index and numbers

function twoSums(numbers: number[], target: number){
  let numMap = new Map();

  for (const key in numbers) {
   let find = target - numbers[key];
   let mapIndex = numMap.get(find);
   if(mapIndex){
    return [[mapIndex, key], [numbers[mapIndex], numbers[key]]]
   }
   numMap.set(numbers[key], key);
  }
  return [];
}

let nums = [4, 3, 8, 3, 2, 6, 1, 7];
let target = 19;
console.log(twoSums(nums, target));