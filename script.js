const apiKey = '8584f75553ee5fbf67c83208c37ab4c2';
const units = 'imperial'; // or 'imperial'
const cnt = 5; // number of forecast entries

async function fetchWeatherData() { 
    const city = document.getElementById('cityInput').value;
    console.log(`city: ${city}`)
    try {
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${(city)}&appid=${(apiKey)}&units=${units}&cnt=${cnt}`
        );

        if (!response.ok) {
            console.error('API error', response.status);
            if (response.status = 404) {
                console.error("data field is incorrect")
                document.getElementById('error').innerText = 'error: data field is incorrect. please recheck your city for misspellings and try again';
            }
            return;
        }

        document.getElementById('error').innerText = '';
        const data = await response.json();
        
        const temp = Math.floor(data.list[0].main.temp)
        const icon = data.list[0].weather[0].icon;
        const cityName = data.city.name;
        const description = data.list[0].weather[0].description;
        const humidity = data.list[0].main.humidity;
        console.log('weather data', Math.floor(data.list[0].main.temp));
        document.getElementById('weather').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <h3>${temp}°F   ${cityName}   current humidity: ${humidity}   ${description}</h3>`;
    } catch (error) {
        console.error('Error:', error);
    }
}
