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
    })
}