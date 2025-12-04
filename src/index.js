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