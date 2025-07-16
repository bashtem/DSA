function romanToInt(s: string): number {
    let romanMap = new Map([
      ["I", 1],
      ["V", 5],
      ["X", 10],
      ["L", 50],
      ["C", 100],
      ["D", 500],
      ["M", 1000],
    ]);
  
    let romanMapExt = new Map([
      ["IV", 4],
      ["IX", 9],
      ["XL", 40],
      ["XC", 90],
      ["CD", 400],
      ["CM", 900],
    ]);
  
    let res = 0;
  
    for (let index = 0; index < s.length; index++) {
      let twoStr = s[index] + s[index + 1];
  
      if (romanMapExt.has(twoStr)) {
        res += Number(romanMapExt.get(twoStr));
        index++;
      } else res += Number(romanMap.get(s[index]));
    }
  
    return res;
  }