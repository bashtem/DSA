// Multiple Pointer Pattern

function countUniqueValues(arr: number[]) {
  // add whatever parameters you deem necessary - good luck!
  let set = new Set(arr);
  return set.size;
}

// this would work for sorted array
function countUniqueValuesPointers(arr: number[]) {
  if (!arr.length) return 0;

  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[i] == arr[j]) continue;

    i++;
    arr[i] = arr[j];
  }

  return i + 1;
}
