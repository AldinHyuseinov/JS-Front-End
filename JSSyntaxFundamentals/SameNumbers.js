function checkIfSameNumbers(input) {
  const digitsArr = input.toFixed(0).split("");
  const [firstNumber, ...others] = digitsArr;
  let allSameNumbers = true;

  const firstNumberParsed = parseInt(firstNumber);
  let sum = firstNumberParsed;

  for (const number of others) {
    const otherNumberParsed = parseInt(number);

    if (firstNumberParsed !== otherNumberParsed) {
      allSameNumbers = false;
    }

    sum += otherNumberParsed;
  }

  if (allSameNumbers) {
    console.log("true");
  } else {
    console.log("false");
  }

  console.log(sum);
}

checkIfSameNumbers(1234);
