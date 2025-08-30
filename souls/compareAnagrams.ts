function anagrams(stringA: string, stringB: string) {
  return sortWord(stringA) == sortWord(stringB);
}

function sortWord(word: string) {
  return word.replace(/[^\w]/gi, "").toLowerCase().split("").sort().join("");
}

anagrams("my nam is bash!", "but i know You!");
