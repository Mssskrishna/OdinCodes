import { getWeatherData, getWeathertemp } from "./weatherutil.js";

const button = document.querySelector('.button');
const temperaturetoo = document.querySelector('#temperature')
let initial = "london"
let temperatureUnit = 'C'
async function renderdata() {
    const cityname = document.querySelector('#cityname').value
    let temperature, feelslike, data;
    if (!cityname) {
        data = await getWeathertemp(initial, temperatureUnit);

    } else {
        data = await getWeathertemp(cityname, temperatureUnit);
        initial = cityname;
    }
    temperature = data[0];
    feelslike = data[1];
    console.log("temperature: " + temperature);
    console.log("feelslike : " + feelslike)
}

button.addEventListener('click', async () => {
    renderdata()

});
temperaturetoo.addEventListener('click', () => {
    temperatureUnit = temperatureUnit === 'F' ? 'C' : 'F';
    temperaturetoo.textContent = temperatureUnit;
    renderdata()
})

