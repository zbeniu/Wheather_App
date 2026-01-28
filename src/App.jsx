import { useState, useEffect, useMemo, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {getWeatherForCities, getForect} from './services/weatherService'
import {transformCurrentWeather, transformForecast} from './utils/weatherTransform'
import HomePage from './Pages/HomePage'
import CityDetailPage from './Pages/CityDetailPage'
import FavoritePage from './Pages/FavoritePage'
import './App.css'

const CITIES = ['Warszawa', 'Kraków', 'Wrocław', 'Łódź', 'Gdańsk'];

function App() {
  const [miasta, setMiasta] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddCity= (newCity) =>{
    setMiasta(prevCities => [...prevCities, newCity]);
  }

  const handleRemoveCity = (cityId) => {
    setMiasta(prevCities => prevCities.filter(city => city.id !== cityId))
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Pobieranie danych");

        const currentWeatherData = await getWeatherForCities(CITIES);
        console.log("Pobrano dane", currentWeatherData);
        const transformCities = currentWeatherData.map(transformCurrentWeather);

        console.log(transformCities);

        const citiesWithForeacast = await Promise.all(
          transformCities.map(async(city, index) =>{
           const forecastData = await getForect(CITIES[index]);
           const forecast = transformForecast(forecastData);
           return{
            ...city,
            prognoza5Dni: forecast
           }
          })
        );
        console.log(citiesWithForeacast);
        setMiasta(citiesWithForeacast);
      }
      catch(err){
        console.error('Blad', err);
      }
      finally{
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className='loading-container'>
        <h1>Ładowanie danych pogodowych...</h1>
        <p>Proszę czekać...</p>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage miasta={miasta} onAddCity={handleAddCity} onRemoveCity={handleRemoveCity}/>} />
          <Route path="/miasto/:cityId" element={<CityDetailPage miasta={miasta}/>} />
          <Route path="/ulubione" element={<FavoritePage miasta={miasta}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
