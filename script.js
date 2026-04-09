const form = document.querySelector("#weather-form");
const input = document.querySelector("#location");
const resultDiv = document.querySelector("#weather-result");
const loading = document.querySelector("#loading");

// FETCH DATA FROM API
async function getWeather(location) {
  const response = await fetch(`https://wttr.in/${location}?format=j1`);
  const data = await response.json();
  return data;
}

// PROCESS RAW JSON
function processWeatherData(data) {
  return {
    area: data.nearest_area[0].areaName[0].value,
    temp: data.current_condition[0].temp_C,
    condition: data.current_condition[0].weatherDesc[0].value
  };
}

// DISPLAY TO UI
function displayWeather(data) {
  resultDiv.innerHTML = `
    <h2>${data.area}</h2>
    <p>🌡 Temp: ${data.temp}°C</p>
    <p>🌥 Condition: ${data.condition}</p>
  `;
}

// HANDLE FORM SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loading.style.display = "block";

  const location = input.value;

  const rawData = await getWeather(location);
  const cleanData = processWeatherData(rawData);

  loading.style.display = "none";

  displayWeather(cleanData);
});