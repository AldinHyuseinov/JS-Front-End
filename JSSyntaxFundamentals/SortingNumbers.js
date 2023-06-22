function sortNumbers(numbers) {
  const smallestToBiggest = [...numbers].sort((a, b) => a - b);
  const biggestToSmallest = [...numbers].sort((a, b) => b - a);

  const sortedArr = [];

  for (let index = 0; index < numbers.length / 2; index++) {
    sortedArr.push(smallestToBiggest.shift());
    sortedArr.push(biggestToSmallest.shift());
  }
  return sortedArr;
}

sortNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);
