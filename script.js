// Change this to your live Vercel URL once you deploy!
const PROXY_URL = 'https://monkeyweather-b13rspmyc-shashwats-projects-5760ae3e.vercel.app/api/proxy'; 

async function fetchWeatherData() {
    let city = document.getElementById('cityInput').value.trim();
    let state = document.getElementById('stateInput').value.trim();
    let country = document.getElementById('countryInput').value.trim();

    try {
        let responseweather;

        if (city || state || country) {
            responseweather = await fetch(
                `${PROXY_URL}?city=${city}&state=${state}&country=${country}`
            );
        } else {
            responseweather = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    const res = await fetch(`${PROXY_URL}?lat=${lat}&lon=${lon}`);
                    resolve(res);
                }, reject);
            });
        }

        if (!responseweather.ok) {
            console.error('API error', responseweather.status);
            document.getElementById('error').innerText =
                'error: data field is incorrect. please recheck your city';
            return;
        }

        document.getElementById('error').innerText = '';
        const data = await responseweather.json();

        const temp = Math.floor(data.list[0].main.temp);
        const icon = data.list[0].weather[0].icon;
        const cityName = data.city.name;
        const description = data.list[0].weather[0].description;
        const humidity = data.list[0].main.humidity;

        document.getElementById('weather').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <h3>
                ${temp}°F ${cityName}
                <div>humidity: ${humidity}</div>
                ${description}
            </h3>
        `;

    } catch (error) {
        console.error('Error:', error);
    }
}
