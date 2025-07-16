function longestCommonPrefix(strs: string[]): string {
    let commonStr: string = "";
  
    for (let index = 0; index < strs[0].length; index++) {
      let check: string = "";
      for (let strIndex = 0; strIndex < strs.length; strIndex++) {
        if (strIndex == 0) {
          check = strs[strIndex][index];
        } else {
          if (check != strs[strIndex][index]) {
            check = "";
            break;
          }
        }
      }
      if (!check) break;
      commonStr += check;
    }
  
    return commonStr;
  }