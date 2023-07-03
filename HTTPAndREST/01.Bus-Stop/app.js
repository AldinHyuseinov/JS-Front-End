function getInfo() {
  const busList = document.getElementById("buses");
  busList.innerHTML = "";

  const stopId = document.getElementById("stopId").value;
  const stopName = document.getElementById("stopName");

  if (stopId === "" || stopId === " ") {
    stopName.textContent = "Error";
    return;
  }

  const getData = async () => {
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);
    return response.status === 200 && (await response.json());
  };

  const resolve = async () => {
    const busInfo = await getData();

    if (busInfo) {
      stopName.textContent = busInfo.name;
      const buses = busInfo.buses;

      for (const busId in buses) {
        const item = document.createElement("li");
        item.textContent = `Bus ${busId} arrives in ${buses[busId]} minutes`;
        busList.appendChild(item);
      }
    } else {
      stopName.textContent = "Error";
    }
  };

  resolve();
}
