// Given an array subString, group the anagram together. you can return the answer in any orderBy.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// output [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

export function groupAnagrams(strs: String[]): String[][] {
  let map = new Map<String, String[]>();

  for (const str of strs) {
    let sortedStr = str.split("").sort().join("");
    if (!map.has(sortedStr)) map.set(sortedStr, [str]);
    else {
      let mapValue = map.get(sortedStr) as String[];
      map.set(sortedStr, [...mapValue, str]);
    }
  }

  return Array.from(map.values());
}


let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
let res = groupAnagrams(strs);

console.log(res);

