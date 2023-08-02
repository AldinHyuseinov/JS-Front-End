function storeCars(input) {
  const garagesWithCars = input.reduce((acc, curr) => {
    const [garageNumber, carsInfo] = curr.split(" - ");

    if (!acc.hasOwnProperty(garageNumber)) {
      acc[garageNumber] = [];
    }

    const cars = carsInfo.split(", ");
    acc[garageNumber].push(cars);

    return acc;
  }, {});

  Object.keys(garagesWithCars).forEach((garageNumber) => {
    console.log(`Garage № ${garageNumber}`);
    garagesWithCars[garageNumber].forEach((cars) => {
      console.log(
        `--- ${cars
          .map((car) => car.split(": "))
          .map(([key, value]) => `${key} - ${value}`)
          .join(", ")}`
      );
    });
  });
}

storeCars([
  "1 - color: blue, fuel type: diesel",
  "1 - color: red, manufacture: Audi",
  "2 - fuel type: petrol",
  "4 - color: dark blue, fuel type: diesel, manufacture: Fiat",
]);

storeCars([
  "1 - color: green, fuel type: petrol",
  "1 - color: dark red, manufacture: WV",
  "2 - fuel type: diesel",
  "3 - color: dark blue, fuel type: petrol",
]);
