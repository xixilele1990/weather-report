//wave 3

const cityName = document.getElementById("headerCityName")
const cityInput = document.getElementById("cityNameInput")

cityInput.addEventListener("input", () => {
    cityName.textContent = cityInput.value;
});