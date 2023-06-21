function sumDigits(number) {
  let sum = 0;

  number
    .toFixed(0)
    .split("")
    .forEach((digit) => (sum += parseInt(digit)));

  console.log(sum);
}

sumDigits(543);
