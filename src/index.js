// Wave 2, Fahrenheit as the base unit
const tempValueEl = document.getElementById('tempValue');
const landscapeEl = document.getElementById('landscape');

const state = {
  temperature: 70,
  defaultCity: 'Seattle',
};

function kelvinToFahrenheit(kelvin) {
  return (kelvin - 273.15) * (9 / 5) + 32;
}

const temperatureColorClasses = [
  'temp-hot',
  'temp-warm',
  'temp-mild',
  'temp-cool',
  'temp-cold',
];

const getTemperatureColorClass = (temp) => {
  if (temp >= 80) {
    return temperatureColorClasses[0];
  }
  if (temp >= 70) {
    return temperatureColorClasses[1];
  }
  if (temp >= 60) {
    return temperatureColorClasses[2];
  }
  if (temp >= 50) {
    return temperatureColorClasses[3];
  }

  return temperatureColorClasses[4];
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
  tempValueEl.textContent = `${state.temperature}°F`;
  tempValueEl.classList.remove(...temperatureColorClasses);
  tempValueEl.classList.add(getTemperatureColorClass(state.temperature));
  landscapeEl.textContent = getLandscapeForTemperature(state.temperature);
};

const registerTemperatureControls = () => {
  const increaseTempControl = document.getElementById('increaseTempControl');
  const decreaseTempControl = document.getElementById('decreaseTempControl');

  increaseTempControl.addEventListener('click', () => {
    state.temperature += 1;
    updateTemperatureUI();
  });
  
  decreaseTempControl.addEventListener('click', () => {
    state.temperature -= 1;
    updateTemperatureUI();
  });
};


//wave 3

const cityName = document.getElementById('headerCityName');
const cityInput = document.getElementById('cityNameInput');

const handleCityInput = () => {
  cityName.textContent = cityInput.value;
};


// Wave 4a: LocationIQ

const PROXY_BASE_URL = 'https://ada-weather-report-proxy-server.onrender.com';

async function getCoordinates(cityName) {
    try {
        const response = await axios.get(`${PROXY_BASE_URL}/location?q=${cityName}`);
        const results = response.data;
        if (!Array.isArray(results) || results.length === 0) {
          console.error('No location results for', cityName, results);
          return null;
        }
        const firstResult = results[0];
        return {lat: firstResult.lat, lon: firstResult.lon};
    } catch (error) {
        console.error('Error getting coordinates:', error);
        return null;
    }
}

// Wave 4b: : hook up "Get Realtime Temperature" button
async function getTemperature(lat, lon) {
  try {
    const response = await axios.get(`${PROXY_BASE_URL}/weather`, {
      params: { lat, lon },
    });

    const kelvin = response.data.main.temp;

    if (kelvin === undefined) {
      console.error('temp not found in response.data');
      return null;
    }

    return kelvinToFahrenheit(kelvin);
  } catch (error) {
    console.error('Error getting temperature from proxy:', error);
    throw error;
  }
}


const currentTempButton = document.getElementById('currentTempButton');

async function handleCurrentTempClick() {
  const currentCity = cityInput.value || state.defaultCity;

  try {
    const coords = await getCoordinates(currentCity);
    if (!coords) return;

    const tempF = await getTemperature(coords.lat, coords.lon);
    if (tempF == null) return;

    state.temperature = Math.round(tempF);
    updateTemperatureUI();
  } catch (error) {
    console.error('Error updating realtime temperature:', error);
  }
}



// wave 5
const skySelect = document.getElementById('skySelect');
const skyElement = document.getElementById('sky');

const skyOptions = {
  Sunny: '☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️',
  Cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  Rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌧💧',
  Snowy: '❄️❄️❄️❄️❄️❄️❄️❄️',
}

const updateSkyUI = () =>{
  const currentSky = skySelect.value;
  skyElement.textContent = skyOptions[currentSky];
};


//wave 6
const resetButton = document.getElementById('cityNameReset');

const handleResetClick = () => {
  cityInput.value = state.defaultCity;
  cityName.textContent = state.defaultCity;
};

const init = () => {
  registerTemperatureControls();
  cityInput.addEventListener('input', handleCityInput);
  currentTempButton.addEventListener('click', handleCurrentTempClick);
  skySelect.addEventListener('change', updateSkyUI);
  resetButton.addEventListener('click', handleResetClick);

  handleCurrentTempClick();
  handleCityInput();
  updateTemperatureUI();
  updateSkyUI();
};

init();












