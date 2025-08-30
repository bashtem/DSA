export function maxChar(str: string) {
  let map = new Map<String, number>();
  str.split("").forEach((each) => {
    if (map.has(each)) {
      let count = (map.get(each) as number) + 1;
      map.set(each, count);
    } else {
      map.set(each, 1);
    }
  });

  let arrs = Array.from(map.entries());
  let max = -1;
  let maxIndex = -1;

  for (const key in arrs) {
    let item = arrs[key];
    if (item[1] > max) {
      max = item[1];
      maxIndex = parseInt(key);
    }
  }

  return arrs[maxIndex][0];
}
