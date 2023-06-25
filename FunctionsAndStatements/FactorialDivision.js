function calculateFactorialAndDivide(firstNumber, secondNumber) {
  const factorial = (number) => {
    let result = 1;

    for (let index = number; index > 1; index--) {
      result *= index;
    }

    return result;
  };

  console.log((factorial(firstNumber) / factorial(secondNumber)).toFixed(2));
}

calculateFactorialAndDivide(6, 2);
