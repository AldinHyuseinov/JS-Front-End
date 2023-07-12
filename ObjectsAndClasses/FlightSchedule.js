function printFlightStatuses(input) {
  const flights = input[0].reduce((acc, curr) => {
    const [sector, destination] = curr.split(/(?<=^\S+)\s/gm);
    acc[sector] = { destination, status: null };
    return acc;
  }, {});

  input[1].forEach((flightStatus) => {
    const [sector, status] = flightStatus.split(" ");

    if (flights.hasOwnProperty(sector)) {
      flights[sector].status = status;
    }
  });

  const values = Object.values(flights);
  const statusToSearch = input[2][0];

  if (statusToSearch === "Ready to fly") {
    values
      .filter(({ _, status }) => status === null)
      .forEach(({ destination, status }) => {
        status = "Ready to fly";
        console.log(`{ Destination: '${destination}', Status: '${status}' }`);
      });
  } else {
    values
      .filter(({ _, status }) => status === statusToSearch)
      .forEach(({ destination, status }) => {
        console.log(`{ Destination: '${destination}', Status: '${status}' }`);
      });
  }
}

printFlightStatuses([
  [
    "WN269 Delaware",
    "FL2269 Oregon",
    "WN498 Las Vegas",
    "WN3145 Ohio",
    "WN612 Alabama",
    "WN4010 New York",
    "WN1173 California",
    "DL2120 Texas",
    "KL5744 Illinois",
    "WN678 Pennsylvania",
  ],
  ["DL2120 Cancelled", "WN612 Cancelled", "WN1173 Cancelled", "SK430 Cancelled"],
  ["Cancelled"],
]);

printFlightStatuses([
  [
    "WN269 Delaware",
    "FL2269 Oregon",
    "WN498 Las Vegas",
    "WN3145 Ohio",
    "WN612 Alabama",
    "WN4010 New York",
    "WN1173 California",
    "DL2120 Texas",
    "KL5744 Illinois",
    "WN678 Pennsylvania",
  ],
  ["DL2120 Cancelled", "WN612 Cancelled", "WN1173 Cancelled", "SK330 Cancelled"],
  ["Ready to fly"],
]);
