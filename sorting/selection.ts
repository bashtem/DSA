// This algorithm is O(n^2) complexity.
// It scan the array for the minimum element index and then swap with the elements from the beginning of the array till end.

export function selectionSort<T>(array: T[]) {
  for (let index = 0; index < array.length; index++) {
    let indexOfMin = index;
    for (let j = index + 1; j < array.length; j++) {
        if(array[indexOfMin] > array[j]){
            indexOfMin = j
        }
    }
    if(indexOfMin !== index){
        let temp = array[indexOfMin];
        array[indexOfMin] = array[index]
        array[index] = temp
    }
  }

  return array;
}
