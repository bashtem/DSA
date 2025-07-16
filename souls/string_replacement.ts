const sentence = "Hello, world! This is a TypeScript example. 2 and 3 has a way of doing 5 things so what of 8 and 9?";

let res = sentence.replace(/(\d)/g, (match) => {
  const num = parseInt(match, 10);
  if (num % 2 === 0) {
    return `${num} is even`;
  } else {
    return `${num} is odd`;
  }
})

res