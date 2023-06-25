function checkForPerfectNumber(number) {
  const isPerfectNumber = (number) => {
    if (number <= 0) {
      return false;
    }

    let sum = 0;

    for (let i = 1; i <= number / 2; i++) {
      if (number % i === 0) {
        sum += i;
      }
    }

    return sum === number;
  };

  if (isPerfectNumber(number)) {
    console.log("We have a perfect number!");
  } else {
    console.log("It's not so perfect.");
  }
}

checkForPerfectNumber(6);
checkForPerfectNumber(28);
checkForPerfectNumber(1236498);
