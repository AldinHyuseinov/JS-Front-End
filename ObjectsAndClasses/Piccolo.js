function printParkingLot(cars) {
  const parkingLot = [];

  cars.forEach((car) => {
    const directionAndNumber = car.split(", ");
    const direction = directionAndNumber[0];
    const carNumber = directionAndNumber[1];
    const carIndex = parkingLot.findIndex((car) => car.carNumber === carNumber);

    direction === "IN"
      ? carIndex === -1 && parkingLot.push({ carNumber: carNumber })
      : direction === "OUT" && carIndex >= 1 && parkingLot.splice(carIndex, 1);
  });

  parkingLot.length >= 1
    ? parkingLot
        .sort((a, b) => (a.carNumber > b.carNumber) - (a.carNumber < b.carNumber))
        .forEach((car) => console.log(car.carNumber))
    : console.log("Parking Lot is Empty");
}

printParkingLot([
  "IN, CA2844AA",
  "IN, CA1234TA",
  "OUT, CA2844AA",
  "IN, CA9999TT",
  "IN, CA2866HI",
  "OUT, CA1234TA",
  "IN, CA2844AA",
  "OUT, CA2866HI",
  "IN, CA9876HH",
  "IN, CA2822UU",
]);

printParkingLot(["IN, CA2844AA", "IN, CA1234TA", "OUT, CA2844AA", "OUT, CA1234TA"]);
