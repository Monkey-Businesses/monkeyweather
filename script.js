const apiKey = '8584f75553ee5fbf67c83208c37ab4c2';
const units = 'imperial'; // or 'metric'
const cnt = 5;

async function fetchWeatherData() {
    const response = await fetch('http://ip-api.com/json');
    const ipData = await response.json();

    let city = document.getElementById('cityInput').value.trim();
    let state = document.getElementById('stateInput').value.trim();
    let country = document.getElementById('countryInput').value.trim();

    if (!city) city = ipData.city;
    if (!state) state = ipData.region;
    if (!country) country = ipData.countryCode;

    console.log(ipData.city)
    console.log(ipData.region)
    console.log(ipData.countryCode)

    try {
        
        const responseweather = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${(city)},${(state)},${(country)}&appid=${(apiKey)}&units=${units}&cnt=${cnt}`
        );

        if (!responseweather.ok) {
            console.error('API error', responseweather.status);
            if (responseweather.status === 404) {
                console.error("data field is incorrect")
                document.getElementById('error').innerText = 'error: data field is incorrect. please recheck your city for misspellings and try again';
            }
            return;
        }

        document.getElementById('error').innerText = '';
        const data = await responseweather.json();
        
        const temp = Math.floor(data.list[0].main.temp)
        const icon = data.list[0].weather[0].icon;
        const cityName = data.city.name;
        const description = data.list[0].weather[0].description;
        const humidity = data.list[0].main.humidity;
        console.log('weather data', Math.floor(data.list[0].main.temp));
        document.getElementById('weather').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <h3>${temp}°F   ${cityName}   <div>current humidity: ${humidity} </div>
    ${description}</h3>`;
    } catch (error) {
        console.error('Error:', error);
    }
}
