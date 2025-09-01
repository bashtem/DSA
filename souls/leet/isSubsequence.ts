// Multiple Pointers - isSubsequence
// Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string
//  form a subsequence of the characters in the second string. In other words, the function should check 
// whether the characters in the first string appear somewhere in the second string, without their order changing.

// Examples:

// isSubsequence('hello', 'hello world'); // true
// isSubsequence('sing', 'sting'); // true
// isSubsequence('abc', 'abracadabra'); // true
// isSubsequence('abc', 'acb'); // false (order matters)
// Your solution MUST have AT LEAST the following complexities:

// Time Complexity - O(N + M)

// Space Complexity - O(1)

function isSubsequence(first: string, second: string) {
  if(!first.length) return true;

  if(first.length > second.length) return false;

  let i = 0
  let j = 0

  while(j < second.length){
    if(first[i] == second[j]) i++

    if(i == first.length) return true;
    j++
  }

  return false;
}