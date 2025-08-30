function steps(n: number) {
  let element = "";
  for (let index = 0; index < n; index++) {
    element += "#";
    let res = `${element.padEnd((index + 1), " ")}`;

    console.log(`${element}`);
  }
}

steps(10);

// '#     '
// '##    '
// '###   '
// '####  '
// '##### '
// '######'
