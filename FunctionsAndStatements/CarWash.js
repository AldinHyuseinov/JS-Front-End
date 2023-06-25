function washCar(commands) {
  let result = 0;

  commands.forEach((command) => {
    switch (command) {
      case "soap":
        result += 10;
        break;
      case "water":
        result += result * 0.2;
        break;
      case "vacuum cleaner":
        result += result * 0.25;
        break;
      case "mud":
        result -= result * 0.1;
        break;
    }
  });

  console.log(`The car is ${result.toFixed(2)}% clean.`);
}

washCar(["soap", "soap", "vacuum cleaner", "mud", "soap", "water"]);
washCar(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"]);
