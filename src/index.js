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

//wave 4 LocationIQ
async function getCoordinates(cityName) {
    try {
        const response = await axios.get(`http://localhost:5000/location?q=${cityName}`);
        const firstResult = response.data[0];
        return {lat: firstResult.lat, lon: firstResult.lon};
    } catch (error) {
        console.error("Error getting coordinates:", error);
        return null;
    }
}

getCoordinates("Seattle").then(coords => console.log(coords));

// function getCoordinates(cityName) {
//     return axios
//         .get(`http://localhost:5000/location?q=${cityName}`)
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             console.error("Error getting coordinates:", error);
//             return null;
//         });
// }