function rotateArray(array, numberOfRotations) {
  for (let index = 0; index < numberOfRotations; index++) {
    array.push(array.shift());
  }

  console.log(array.join(" "));
}

rotateArray([2, 4, 15, 31], 5);
