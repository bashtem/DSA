function vowels(str: string) {
  let strArr = str.match(/[aeiou]/gi);
  if (strArr && strArr?.length) return strArr.length;
  return 0;
}
