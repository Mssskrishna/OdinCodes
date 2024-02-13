const weather_api = "4d70bc4d62504a0da68143152241302"
async function getWeather(city) {
    const weather = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weather_api}&q=${city}`)
    const weatherj = await weather.json()
    return weatherj;
}

async function getWeathertemp(city, mode) {
    const weather = await getWeather(city)
    const temperature = unit === 'F' ? weather.current.temp_f : weather.current.temp_c;
    const feelsLike = unit === 'F' ? weather.current.feelslike_f : weather.current.feelslike_c;
    return [temperature, feelsLike];
}

export { getWeathertemp, getWeatherData }