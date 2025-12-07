// Wave 2,Fahrenheit as the base unit

const tempValueEl = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const landscapeEl = document.getElementById('landscape');

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


//wave 3

const cityName = document.getElementById("headerCityName");
const cityInput = document.getElementById("cityNameInput");

cityInput.addEventListener("input", () => {
    cityName.textContent = cityInput.value;
});


// Wave 4a: LocationIQ

const PROXY_BASE_URL = 'https://ada-weather-report-proxy-server.onrender.com';

async function getCoordinates(cityName) {
    try {
        const response = await axios.get(`${PROXY_BASE_URL}/location?q=${cityName}`);
        //console.log('location response.data =', response.data);
        const results = response.data;
        //console.log('location results =', results);
        if (!Array.isArray(results) || results.length === 0) {
          console.error('No location results for', cityName, results);
          return null;
        }
        const firstResult = results[0];
        return {lat: firstResult.lat, lon: firstResult.lon};
    } catch (error) {
        console.error("Error getting coordinates:", error);
        return null;
    }
}

// Wave 4b: : hook up "Get Realtime Temperature" button
async function getTemperature(lat, lon) {
  try {
    const response = await axios.get(`${PROXY_BASE_URL}/weather`, {
      params: { lat, lon },
    });

    //console.log('weather response.data =', response.data);

    const kelvin = response.data.main.temp;

    if (kelvin === undefined) {
      console.error('temp not found in response.data');
      return null;
    }

    const fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
    return fahrenheit;
  } catch (error) {
    console.error('Error getting temperature from proxy:', error);
    throw error;
  }
}


const currentTempButton = document.getElementById('currentTempButton');

const handleCurrentTempClick = async () => {
  const currentCity = cityInput.value || 'Seattle';

  try {
    const coords = await getCoordinates(currentCity);
    if (!coords) return;

    const tempF = await getTemperature(coords.lat, coords.lon);
    if (tempF == null) return;

    temperature = Math.round(tempF);
    updateTemperatureUI();
  } catch (error) {
    console.error('Error updating realtime temperature:', error);
  }
};

currentTempButton.addEventListener('click', handleCurrentTempClick);



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
  //console.log('currentSky = ', currentSky);
  //console.log('skyOptions[currentSky] = ', skyOptions[currentSky]);
}

skySelect.addEventListener('change',updateSkyUI); 
updateSkyUI();


//wave 6
const defaultCity = "Seattle";
const resetButton = document.getElementById("cityNameReset");

resetButton.addEventListener("click", () => {
    cityInput.value = defaultCity;
    cityName.textContent = defaultCity;
});












