import axios from "axios";
import { API_KEY, API_BASE_URL } from "../config/api";
import { transformForecast } from "../utils/weatherTransform";

const weatherApi = axios.create({
    baseURL: API_BASE_URL,
    params:{
        appid: API_KEY,
        units: 'metric',
        lang: 'pl'
    }
});

export const getCurrentWeather = async(miasto) => {
    const response = await weatherApi.get('/weather',{
        params: {q: miasto}
    });
    return response.data;
}

export const getForect = async(miasto) => {
    const response = await weatherApi.get('/forecast',{
        params: {q: miasto}
    });
    return response.data;
}

export const getWeatherForCities = async(miasta) => {
    const promises = miasta.map(miasto => getCurrentWeather(miasto));
    return Promise.all(promises);
};

export const searchAndAddCity = async (cityName) => {
    try {
        const {transformCurrentWeather, transformForecast} = await import ('../utils/weatherTransform');
        const currentWeatherData = await getCurrentWeather(cityName);
        const cityData = transformCurrentWeather(currentWeatherData);
        const forecastData = await getForect(cityName);
        const forecast = transformForecast(forecastData);
        return{
            ...cityData,
            prognoza5Dni: forecast,
        };
    }
    catch (error) {
        if(error.response && error.response.status === 404){
            throw new Error('Nie znaleziono miasta');
        }
        throw new Error('Wystapil blad podczas wyszukiwania miasta');
    }
}