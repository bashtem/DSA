// function chunk(array: [], size: number) {
//   let count = 0
//   let arr = []
//   let ar = []
//     for (let index = 0; index < array.length; index++) {
//       ar.push(array[index])
//       if((count+1) == size || index == array.length-1){
//         arr.push(ar)
//         count = 0;
//         ar = [];

//       }else{
//         count++
//       }
//     }
//     return arr
// }

function chunk<T>(array: T[], size: number) {
  let arr = [];
  for (let index = 0; index < array.length; index+=size) {
    arr.push(array.slice(index, size+index));
  }

  console.log(arr)
}

chunk([24,5,6,3,2,2,1], 5)