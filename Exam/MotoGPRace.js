function solve(input) {
  const ridersInput = input.shift();
  const numberOfRiders = Number(ridersInput);
  const riders = [];

  for (let index = 0; index < numberOfRiders; index++) {
    const [rider, fuelCapacity, position] = input.shift().split("|");

    const fuelCapacityNumber = Number(fuelCapacity);
    const positionNumber = Number(position);

    riders.push({
      rider,
      fuelCapacity: fuelCapacityNumber,
      position: positionNumber,
    });
  }

  let line = input.shift();
  while (line !== "Finish") {
    const [command, ...rest] = line.split(" - ");

    switch (command) {
      case "StopForFuel":
        const rider = rest[0];
        const minimumFuel = Number(rest[1]);
        const changedPosition = Number(rest[2]);

        const riderIndex = riders.findIndex((riderObj) => riderObj.rider === rider);

        if (riders[riderIndex].fuelCapacity < minimumFuel) {
          riders[riderIndex].fuelCapacity = 100;
          riders[riderIndex].position = changedPosition;

          console.log(
            `${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`
          );
        } else {
          console.log(`${rider} does not need to stop for fuel!`);
        }
        break;

      case "Overtaking":
        const firstRider = rest[0];
        const secRider = rest[1];

        const firstRiderIndex = riders.findIndex((riderObj) => riderObj.rider === firstRider);
        const secRiderIndex = riders.findIndex((riderObj) => riderObj.rider === secRider);

        const firstRiderPosition = riders[firstRiderIndex].position;
        const secRiderPosition = riders[secRiderIndex].position;

        if (firstRiderPosition < secRiderPosition) {
          riders[firstRiderIndex].position = secRiderPosition;
          riders[secRiderIndex].position = firstRiderPosition;

          console.log(`${firstRider} overtook ${secRider}!`);
        }
        break;

      case "EngineFail":
        const failedEngineRider = rest[0];
        const lapsLeft = rest[1];

        const failedEngineRiderIndex = riders.findIndex(
          (riderObj) => riderObj.rider === failedEngineRider
        );

        riders.splice(failedEngineRiderIndex, 1);
        console.log(
          `${failedEngineRider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`
        );
        break;
    }
    line = input.shift();
  }

  riders.forEach(({ rider, position }) => {
    console.log(rider);
    console.log(`  Final position: ${position}`);
  });
}

solve([
  "3",
  "Valentino Rossi|100|1",
  "Marc Marquez|90|2",
  "Jorge Lorenzo|80|3",
  "StopForFuel - Valentino Rossi - 50 - 1",
  "Overtaking - Marc Marquez - Jorge Lorenzo",
  "EngineFail - Marc Marquez - 10",
  "Finish",
]);

solve([
  "4",
  "Valentino Rossi|100|1",
  "Marc Marquez|90|3",
  "Jorge Lorenzo|80|4",
  "Johann Zarco|80|2",
  "StopForFuel - Johann Zarco - 90 - 5",
  "Overtaking - Marc Marquez - Jorge Lorenzo",
  "EngineFail - Marc Marquez - 10",
  "Finish",
]);
