const apiKey = '343e2bb9ca5a8f4d8f810d0a9128fa03'; 

document.getElementById('getWeather').addEventListener('click', getWeather);

function getWeather() {
    const location = document.getElementById('location').value.trim();

    if (location) {
        fetchWeatherByCity(location);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherByLocation, handleError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
}

function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(err => alert("Could not fetch weather data. Please try again."));
}

function getWeatherByLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(err => alert("Could not fetch weather data. Please try again."));
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weatherInfo');
    const { name, weather, main } = data;

    const weatherContent = `
        <p><span>Location:</span> ${name}</p>
        <p><span>Temperature:</span> ${main.temp}°C</p>
        <p><span>Weather:</span> ${weather[0].description}</p>
        <p><span>Humidity:</span> ${main.humidity}%</p>
        <p><span>Wind Speed:</span> ${data.wind.speed} m/s</p>
    `;

    weatherDiv.innerHTML = weatherContent;
}

function handleError(error) {
    alert("Unable to retrieve your location. Please enter a city manually.");
}
