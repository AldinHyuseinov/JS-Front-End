function calculate(...numbers) {
  const sum = (n1, n2) => {
    return n1 + n2;
  };

  const subtract = (n1, n2) => {
    return n1 - n2;
  };

  console.log(subtract(sum(numbers[0], numbers[1]), numbers[2]));
}

calculate(23, 6, 10);
calculate(1, 17, 30);
calculate(42, 58, 100);
