function findSmallestNumber(...numbers) {
  console.log(numbers.sort((a, b) => a - b)[0]);
}

findSmallestNumber(2, 5, 3);
findSmallestNumber(600, 342, 123);
findSmallestNumber(25, 21, 4);
findSmallestNumber(2, 2, 2);
