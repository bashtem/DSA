//Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until the list is sorted 
//Outer Loop: You start with the first element and move to the last element of the array. This outer loop will ensure that we traverse the entire array.
//Inner Loop: Within the outer loop, there's an inner loop that goes through the array from the beginning up to the last unsorted element. This inner loop compares each element with the next one.


export function bubbleSort<T>(arr: T[]){

    for (let index = 0; index < arr.length; index++) {
        for (let j = 0; j < arr.length; j++) {
           if(arr[j] > arr[j+1]){
            let temp = arr[j]
            arr[j] = arr[j+1]
            arr[j+1] = temp;
           }
        }
        
    }
    return arr;
}