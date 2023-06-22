function determineIfWithinSpeedLimit(driverSpeed, area) {
  const printOverTheSpeedLimitText = (driverSpeed, speedLimit) => {
    const speedDifference = driverSpeed - speedLimit;

    // prettier-ignore
    console.log(`The speed is ${speedDifference} km/h faster than the allowed speed of ${speedLimit} - ${statusOfSpeeding(speedDifference)}`);
  };

  const statusOfSpeeding = (speedDifference) => {
    if (speedDifference <= 20) {
      return "speeding";
    }

    if (speedDifference <= 40) {
      return "excessive speeding";
    }

    return "reckless driving";
  };

  switch (area) {
    case "city":
      if (driverSpeed <= 50) {
        console.log(`Driving ${driverSpeed} km/h in a 50 zone`);
      } else {
        printOverTheSpeedLimitText(driverSpeed, 50);
      }
      break;

    case "residential":
      if (driverSpeed <= 20) {
        console.log(`Driving ${driverSpeed} km/h in a 20 zone`);
      } else {
        printOverTheSpeedLimitText(driverSpeed, 20);
      }
      break;

    case "interstate":
      if (driverSpeed <= 90) {
        console.log(`Driving ${driverSpeed} km/h in a 90 zone`);
      } else {
        printOverTheSpeedLimitText(driverSpeed, 90);
      }
      break;

    case "motorway":
      if (driverSpeed <= 130) {
        console.log(`Driving ${driverSpeed} km/h in a 130 zone`);
      } else {
        printOverTheSpeedLimitText(driverSpeed, 130);
      }
      break;
  }
}

determineIfWithinSpeedLimit(120, "interstate");
