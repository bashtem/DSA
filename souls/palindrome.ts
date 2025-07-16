export function isPalindrome(x: number): boolean {
    let letters = x.toString().split("");
    let lettersLength = letters.length;
    if (lettersLength == 1) return true;
    let flag = false;
  
    for (let index = 0; index < lettersLength; index++) {
  
      if (index + 1 > Math.floor(lettersLength / 2)) return flag;
  
      if (letters[index] == letters[lettersLength - (index + 1)]) flag = true;
      else return false;
    }
  
    return flag;
  }