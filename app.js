document.getElementById('search-button').addEventListener('click', fetchWeatherData);

const weatherDescriptions = {
    Thunderstorm: 'Trovoada',
    Drizzle: 'Chuvisco',
    Rain: 'Chuva',
    Snow: 'Neve',
    Mist: 'Névoa',
    Smoke: 'Fumaça',
    Haze: 'Neblina',
    Dust: 'Poeira',
    Fog: 'Névoa',
    Sand: 'Areia',
    Ash: 'Cinzas',
    Squall: 'Rajada',
    Tornado: 'Tornado',
    Clear: 'Céu limpo',
    Clouds: 'Nublado',
};

async function fetchWeatherData() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        showError('Por favor, insira o nome de uma cidade.');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ebaa72c178d361a9ea376230013811f&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            showError('Cidade não encontrada');
        } else {
            const weatherData = {
                temperature: data.main.temp,
                description: weatherDescriptions[data.weather[0].main] || data.weather[0].main,
                icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            };
            showWeatherData(weatherData);
        }
    } catch (error) {
        showError('Falha ao buscar dados do clima');
    }
}

function showWeatherData(data) {
    document.getElementById('weather-container').classList.remove('d-none');
    document.getElementById('temperature').textContent = `Temperatura: ${data.temperature}°C`;
    document.getElementById('description').textContent = `Descrição: ${data.description}`;
    document.getElementById('weather-icon').src = data.icon;
    document.getElementById('error-message').textContent = '';
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('weather-container').classList.add('d-none');
}
