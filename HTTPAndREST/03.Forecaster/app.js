function attachEvents() {
  document.getElementById("submit").addEventListener("click", handleEvent);
}

async function handleEvent(event) {
  const location = document.getElementById("location");
  const forecastSection = document.getElementById("forecast");

  try {
    const locations = await fetchData("/locations");
    const locationCode = locations.find((locationObj) => locationObj.name === location.value);
    display(
      forecastSection,
      await fetchData(`/today/${locationCode.code}`),
      await fetchData(`/upcoming/${locationCode.code}`)
    );
  } catch (error) {
    forecastSection.style.display = "block";
    forecastSection.innerHTML = "Error";
  }

  event.target.disabled = true;
}

async function fetchData(url) {
  const response = await fetch(`http://localhost:3030/jsonstore/forecaster${url}`);

  if (response.status !== 200) {
    throw new Error();
  }

  return await response.json();
}

function display(forecastSection, ...forecasts) {
  forecastSection.style.display = "block";

  displayCurrentConditions(forecastSection.querySelector("#current"), forecasts[0]);
  displayUpcomingForecast(forecastSection.querySelector("#upcoming"), forecasts[1].forecast);
}

function displayCurrentConditions(forecastSection, currentCoditions) {
  const forecasts = document.createElement("div");
  forecasts.classList.add("forecasts");

  forecasts.appendChild(
    createSpan(getSymbol(currentCoditions.forecast.condition), "condition", "symbol")
  );
  forecasts.appendChild(createConditionSpan(currentCoditions.name, currentCoditions.forecast));

  forecastSection.appendChild(forecasts);
}

function displayUpcomingForecast(forecastSection, upcomingForecast) {
  const forecastInfo = document.createElement("div");
  forecastInfo.classList.add("forecast-info");

  upcomingForecast.forEach(({ low, high, condition }) => {
    const upcomingSpan = createSpan("", "upcoming");
    upcomingSpan.appendChild(createSpan(getSymbol(condition), "symbol"));
    upcomingSpan.appendChild(createSpan(`${low}°/${high}°`, "forecast-data"));
    upcomingSpan.appendChild(createSpan(condition, "forecast-data"));

    forecastInfo.appendChild(upcomingSpan);
  });

  forecastSection.appendChild(forecastInfo);
}

function createConditionSpan(name, { low, high, condition }) {
  const conditionSpan = createSpan("", "condition");

  const className = "forecast-data";
  conditionSpan.appendChild(createSpan(name, className));
  conditionSpan.appendChild(createSpan(`${low}°/${high}°`, className));
  conditionSpan.appendChild(createSpan(condition, className));

  return conditionSpan;
}

function createSpan(textContent, ...classes) {
  const span = document.createElement("span");
  span.textContent = textContent;
  span.classList.add(classes);

  return span;
}

function getSymbol(condition) {
  const symbols = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
  };

  return symbols[condition];
}

attachEvents();
