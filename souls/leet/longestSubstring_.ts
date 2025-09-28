//Multiple Pointer / Sliding window

export function lengthOfLongestSubstring(s: string): number {
  if (s.length == 1) return 1;
  let map = new Map();
  let max = 0;
  let counter = 0;
  let pointer = 0;

  while (pointer < s.length) {
    let each = s[pointer];
    if (map.has(each)) {
      max = Math.max(max, counter);
      pointer = map.get(each) + 1;
      counter = 0;
      map.clear();
      continue;
    }

    map.set(each, pointer);
    counter++;
    pointer++;
  }

  return Math.max(max, counter);
}

export function lengthOfLongestSubstring2(s: string): number {
  // More Optimized
  let pointer = 0;
  let map = new Map();
  let longest = 0;

  for (let index = 0; index < s.length; index++) {
    const each = s[index];

    // CONDITION = (map.get(each) >= pointer) ensure the stored char index is not before the pointer index
    // i.e only get char index between the pointer and the iterating char index since we ain't clearing the cache.

    //‼️‼️‼️ Optionally we can use -> pointer = Math.max(pointer, map.get(each) + 1) and omit the "CONDITION"
    // if (map.has(each)) {
    //   pointer = Math.max(pointer, map.get(each) + 1)
    // }

    if (map.has(each) && map.get(each) >= pointer) {
      pointer = map.get(each) + 1;
    }

    map.set(each, index);
    longest = Math.max(longest, index - pointer + 1); // this will get the length between two indices (offset length)
  }

  return longest;
}

// Method 3
// It can also be solved using an empty array to keep track of each item, if an item exist in the array then we can delete the items from index zero till the duplicate item
// Hint: indexOf and array splice can be used to check and modify the array items
// Push new item to the array
// we always check the lenght of the array and keep track of the longest substring
