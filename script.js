function fetchWeather(location) {
    const weatherInfoDiv = document.getElementById('weatherContainer');
    const loadingDiv = document.getElementById('loading');

    loadingDiv.classList.remove('hidden');

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DBELFYET2HB66AN6SZC56BC6M`, { mode: 'cors' })
        
}