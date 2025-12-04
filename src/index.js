//wave 3

const cityName = document.getElementById("headerCityName")
const cityInput = document.getElementById("cityNameInput")

cityInput.addEventListener("input", () => {
    cityName.textContent = cityInput.value;
});

//wave 6
const defaultCity = "Seattle";
const resetButton = document.getElementById("cityNameReset")

resetButton.addEventListener("click", () => {
    cityInput.value = defaultCity;
    cityName.textContent = defaultCity;
});

/* Wave 2: Temperature controls, color ranges, and landscape */

const tempValueEl = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const landscapeEl = document.getElementById('landscape');

// Use Fahrenheit as the base unit for Wave 2
let temperature = 70;

const temperatureColorClasses = [
  'temp-hot',
  'temp-warm',
  'temp-mild',
  'temp-cool',
  'temp-cold',
];

const getTemperatureColorClass = (temp) => {
  if (temp >= 80) {
    return 'temp-hot';
  }
  if (temp >= 70) {
    return 'temp-warm';
  }
  if (temp >= 60) {
    return 'temp-mild';
  }
  if (temp >= 50) {
    return 'temp-cool';
  }

  return 'temp-cold';
};

const getLandscapeForTemperature = (temp) => {
  if (temp >= 80) {
    return '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
  if (temp >= 70) {
    return '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  }
  if (temp >= 60) {
    return '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  }

  return '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
};

const updateTemperatureUI = () => {
  if (!tempValueEl || !landscapeEl) return;

  tempValueEl.textContent = `${temperature}°F`;

  tempValueEl.classList.remove(...temperatureColorClasses);
  tempValueEl.classList.add(getTemperatureColorClass(temperature));


  landscapeEl.textContent = getLandscapeForTemperature(temperature);
};

const registerTemperatureControls = () => {
  if (increaseTempControl) {
    increaseTempControl.addEventListener('click', () => {
      temperature += 1;
      updateTemperatureUI();
    });
  }

  if (decreaseTempControl) {
    decreaseTempControl.addEventListener('click', () => {
      temperature -= 1;
      updateTemperatureUI();
    });
  }
};
updateTemperatureUI();
registerTemperatureControls();


// wave 5
const skySelect = document.getElementById('skySelect');
const skyElement = document.getElementById('sky');

const skyOptions = {
  sunny: '☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️',
  Cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  Rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌧💧',
  Snowy: '❄️❄️❄️❄️❄️❄️❄️❄️',
}

const updateSkyUI = () =>{
  const currentSky = skySelect.value;
  skyElement.textContent = skyOptions[currentSky];
  //console.log('currentSky = ', currentSky);
  //console.log('skyOptions[currentSky] = ', skyOptions[currentSky]);
}

skySelect.addEventListener('change',updateSkyUI); 
updateSkyUI();







