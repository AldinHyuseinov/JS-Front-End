function printMatrix(size) {
  const matrix = [];

  for (let index = 0; index < size; index++) {
    const arr = [];

    for (let index = 0; index < size; index++) {
      arr.push(size);
    }
    matrix.push(arr);
  }

  matrix.forEach((arr) => console.log(arr.join(" ")));
}

printMatrix(3);
printMatrix(7);
