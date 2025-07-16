export const findOdd = (xs: number[]): number => {
  if (xs.length == 1) return xs[0];
  let numbersMap = new Map();
  let numberSet = new Set<number>();
  
  xs.forEach(element => {
    if(!numbersMap.get(element)){
      numbersMap.set(element, 1);
      numberSet.add(element);
    }else {
      let pick = numbersMap.get(element) + 1;
      if(pick % 2 == 1){
        numberSet.add(element)
      }else numberSet.delete(element);
      numbersMap.set(element, pick)
    }
  })
  
  return Array.from(numberSet)[0];;
};


let xs = [1,1,1,1,1,1,10,1,1,1,1]

console.log(findOdd(xs)); // Output: 10
