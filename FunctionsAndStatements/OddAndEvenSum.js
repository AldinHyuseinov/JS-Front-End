function calculate(number) {
  const oddSum = String(number)
    .split("")
    .map(Number)
    .filter((number) => number % 2 !== 0)
    .reduce((total, current) => {
      return total + current;
    }, 0);

  const evenSum = String(number)
    .split("")
    .map(Number)
    .filter((number) => number % 2 === 0)
    .reduce((total, current) => {
      return total + current;
    }, 0);

  console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

calculate(1000435);
calculate(3495892137259234);
