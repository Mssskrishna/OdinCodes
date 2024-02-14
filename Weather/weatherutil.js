const weather_api = "66af24c06e474bff94a45053241402"
async function getWeather(city) {
    const weather = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weather_api}&q=${city}`,{mode:"cors"})
    const weatherj = await weather.json()
    return weatherj;
}

async function getWeathertemp(city, unit) {
    const weather = await getWeather(city)
    const temperature = unit === 'F' ? weather.current.temp_f : weather.current.temp_c;
    const feelslike = unit === 'F' ? weather.current.feelslike_f : weather.current.feelslike_c;

    const imageurl = 'img/'+weather.current.condition.icon.slice(21)
    const humidity = weather.current.humidity;
    const wind = weather.current.wind_kph;
    const rain = weather.current.precip_mm;
    const type = weather.current.condition.text;
    return {temperature, feelslike,imageurl,humidity,wind,rain,city,type};
}

export { getWeathertemp }
