// Frequency Counter Pattern

function validAnagram(str1: string, str2: string) {
  if (str1.length !== str2.length) return false;

  let sortedStr1 = str1.split("").sort().join();
  let sortedStr2 = str2.split("").sort().join();

  return sortedStr1 === sortedStr2;
}

// This method create a hashmap storing each character count from the first string and then compares it with the second string character count!
// Example using "qwerty" and "qeywrt"
// q -> 1, w -> 1, e -> 1, r -> 1, t -> 1, y -> 1
// Example 2: "aaz" and "zza"
// aaz: a -> 2, z -> 1  MisMatch and must return false!

function validAnagram2(str1: string, str2: string) {
  if (str1.length !== str2.length) return false;

  let mapStr = new Map();

  for (const char of str1) {
    let count = (mapStr.get(char) ?? 0) + 1 || 1;
    mapStr.set(char, count);
  }

  for (const _char of str2) {
    if (!mapStr.get(_char)) return false;

    let count = mapStr.get(_char) - 1; // decrease each character count in the hashmap
    mapStr.set(_char, count);
  }
  return true;
}
