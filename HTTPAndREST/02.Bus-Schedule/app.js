function solve() {
  const infoSpan = document.querySelector(".info");
  let stopId = "depot";
  const departButton = document.getElementById("depart");
  const arriveButton = document.getElementById("arrive");

  async function depart() {
    await handler("depart");
  }

  async function arrive() {
    await handler("arrive");
  }

  async function getInfo() {
    const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`);

    if (response.status === 200) {
      return await response.json();
    }

    throw new Error();
  }

  async function handler(busState) {
    try {
      const info = await getInfo();

      if (busState === "depart") {
        updateInfo("Next stop", info);
        departButton.disabled = true;
        arriveButton.disabled = false;
      } else {
        updateInfo("Arriving at", info);
        arriveButton.disabled = true;
        departButton.disabled = false;
      }
    } catch (err) {
      infoSpan.textContent = "Error";
      departButton.disabled = true;
      arriveButton.disabled = true;
    }
  }

  function updateInfo(busState, info) {
    infoSpan.textContent = `${busState} ${info.name}`;
    stopId = info.next;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
