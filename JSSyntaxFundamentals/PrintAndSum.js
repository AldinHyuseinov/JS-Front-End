function printAndSum(firstNumber, secNumber) {
  const numbers = [];
  let sum = 0;

  for (let index = firstNumber; index <= secNumber; index++) {
    numbers.push(index);
    sum += index;
  }

  console.log(numbers.join(" "));
  console.log(`Sum: ${sum}`);
}

printAndSum(50, 60);
