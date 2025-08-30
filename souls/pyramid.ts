function pyramid(n: number) {
  for (let index = 0; index < n; index++) {
    let element = "";
    let spacePad = n - (index + 1);

    element = element.padEnd(2 * index + 1, "#");

    let space = " ".repeat(spacePad);

    let res = `${space}${element}${space}`;

    console.log(`${res}`);
  }
}

pyramid(4);
