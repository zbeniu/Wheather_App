const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    // Było % 5, powinno być % 8, bo jest 8 kierunków
    return directions[Math.round(degrees / 45) % 8];
};

const weatherToPolish = {
    'Clear': 'Słonecznie',
    'Clouds': 'Pochmurno',
    'Rain': 'Deszcz',
    'Drizzle': 'Mżawka',
    'Thunderstorm': 'Burza',
    'Snow' : 'Śnieg',
    'Mist' : 'Mgła',
    'Fog' : 'Mgła'
};

const weatherToIcon = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌧️',
    'Thunderstorm': '⛈️',
    'Snow' : '❄️',
    'Mist' : '🌫️',
    'Fog' : '🌫️'
}

const getDayName = (date) => {
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    return days[new Date(date).getDay()];
}

export const transformCurrentWeather = (apiData) =>({
    id: apiData.id,
    miasto: apiData.name.toLowerCase(),
    aktualnaTemperatura: Math.round(apiData.main.temp),
    aktualnaPogoda: weatherToPolish[apiData.weather[0].main] || apiData.weather[0].description,
    aktualnyWiatr: Math.round(apiData.wind.speed * 3.6), // Przeliczenie m/s na km/h
    aktualnyKierunekWiatru: getWindDirection(apiData.wind.deg),
    aktualneZachmurzenie: apiData.clouds.all,
    prognoza5Dni: []
});

export const transformForecast = (forecastData) => {
    const dailyData = {};

    forecastData.list.forEach(item => {
        const data = item.dt_txt.split(' ')[0]; // Pobieramy samą datę (bez godziny)
        
        if(!dailyData[data]){
            dailyData[data] = {
                temps: [],
                weather: item.weather[0].main,
                wind: item.wind.speed,
                windDeg: item.wind.deg,
                clouds: item.clouds.all,
                rain: 0
            };
        }

        dailyData[data].temps.push(item.main.temp);
        
        // POPRAWKA BŁĘDU: tutaj było 'date' zamiast 'data'
        if(item.rain && item.rain['3h']){
            dailyData[data].rain += item.rain['3h'];
        }
    });

    // Zwracamy tylko 5 dni
    return Object.keys(dailyData).slice(0, 5).map(date => {
        const day = dailyData[date];
        const temps = day.temps;
        
        return {
            // POPRAWKA NAZW: React oczekuje 'dzień' i 'aktualnaTemperatura'
            dzień: getDayName(date), 
            data: date,
            aktualnaTemperatura: Math.round(Math.max(...temps)), // Najwyższa temp dnia jako główna
            temperatura: Math.round(Math.max(...temps)),         // Dla kompatybilności
            temperaturaNoc: Math.round(Math.min(...temps)),
            pogoda: weatherToPolish[day.weather] || day.weather,
            ikona: weatherToIcon[day.weather] || '☀️',
            wiatr: Math.round(day.wind * 3.6),
            kierunekWiatru: getWindDirection(day.windDeg),
            zachmurzenie: day.clouds,
            opadyPrawdopodobienstwo: day.rain > 0 ? Math.min(100, Math.round(day.rain / 15) * 100) : 0,
            opadyRodzaj: day.rain > 0 ? 'deszcz': null,
            opadyIlosc: Math.round(day.rain)
        };
    });
}