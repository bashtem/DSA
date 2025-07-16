function getStudentIndexById(studentId: number) {
  let students = [1, 4, 6, 8, 8, 9, 0, 2, 1, 7, 9, 6];
  let index = students.findIndex((value) => value === studentId);
  return new Promise((resolve, reject) => {
    if (index >= 0) resolve(`${index}`);
    else reject("studentId could not be found");
  });
}

// getStudentIndexById(1).then(value => console.log(value)).catch((e) => console.log(e))

async function run() {
  try {
    let result = await getStudentIndexById(21);
    console.log(`The student index is ${result}`);
  } catch (error) {
    console.log(error);
  }
}

run();
