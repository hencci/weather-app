document.addEventListener('DOMContentLoaded', function() {
    const defaultCity = 'Lagos';
    fetchWeather(defaultCity);

    document.getElementById('weatherForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const location = document.getElementById('location').value;
        fetchWeather(location);
    });
});

function fetchWeather(location) {
    const weatherInfoDiv = document.getElementById('weatherContainer');
    const loadingDiv = document.getElementById('loading');

    loadingDiv.classList.remove('hidden');

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DBELFYET2HB66AN6SZC56BC6M`, { mode: 'cors' })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const conditions = data.currentConditions.conditions;
        const fahrenheitTemp = data.currentConditions.temp;
        const celsiusTemp = fahrenheitToCelsius(fahrenheitTemp);
        const feelsLikeCelsius = fahrenheitToCelsius(data.currentConditions.feelslike);
        const humidity = data.currentConditions.humidity;
        const windSpeed = data.currentConditions.windspeed;
        const chanceOfRain = data.days[0].precipprob || 0;

        document.getElementById('conditions').textContent = conditions;
        document.getElementById('locationDisplay').textContent = location;
        document.getElementById('temperature').textContent = `${celsiusTemp} °C`;
        document.getElementById('feelsLike').textContent = `${feelsLikeCelsius} °C`;
        document.getElementById('humidity').textContent = `${humidity} %`;
        document.getElementById('chanceOfRain').textContent = `${chanceOfRain} %`;
        document.getElementById('windSpeed').textContent = `${windSpeed} km/h`;

        const dailyForecastDiv = document.getElementById('dailyForecast');
        dailyForecastDiv.innerHTML = '';

        data.days.slice(1, 8).forEach(function(day) {
            const dayDiv = document.createElement('div');
            dayDiv.innerHTML = `
                <p><strong>${formatDay(day.datetime)}</strong></p>
                <p class="max-temp">${fahrenheitToCelsius(day.tempmax)} °C</p>
                <p class="min-temp">${fahrenheitToCelsius(day.tempmin)} °C</p>
            `;
            dailyForecastDiv.appendChild(dayDiv);
        });

        loadingDiv.classList.add('hidden');
    })
}

function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(0);
}

function formatDay(datetime) {
    const date = new Date(datetime);
    return date.toLocaleDateString(undefined, { weekday: 'long' });
}