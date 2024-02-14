import { getWeathertemp } from "./weatherutil.js";

const button = document.querySelector('.search');
const temperatureToo = document.querySelector('#temperature');
const inputContent = document.querySelector('#cityname');
const updateTemp = document.querySelector('.temperature');
const updateFeel = document.querySelector('.feelslike');
const imageTemp = document.querySelector('.image');
const type = document.querySelector('.input');
const rain = document.querySelector('.rain');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityi = document.querySelector('.city');

let initial = "london";
let temperatureUnit = 'C';

async function renderData(city = initial) {
    const data = await getWeathertemp(city, temperatureUnit);
    initial = city;
    updatePage(data);
}

function updatePage(data) {
    updateTemp.innerHTML = `${data.temperature}°${temperatureUnit}`;
    updateFeel.innerHTML = `${data.feelslike}°${temperatureUnit}`;
    imageTemp.src = data.imageurl;
    type.innerHTML = data.type;
    rain.innerHTML = `${data.rain}%`;
    humidity.innerHTML = `${data.humidity}%`;
    wind.innerHTML = `${data.wind}kmph`;
    cityi.innerHTML = data.city;
}

button.addEventListener('click', async () => {
    await renderData(inputContent.value);
    inputContent.value = '';
});

temperatureToo.addEventListener('click', async () => {
    temperatureUnit = temperatureUnit === 'F' ? 'C' : 'F';
    temperatureToo.textContent = temperatureUnit === 'F' ? 'Fahrenheit' : 'Celsius';
    renderData();
});

renderData();
