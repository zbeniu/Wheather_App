import { useState, useMemo, useCallback } from 'react'
import WeatherCard from '../components/WeatherCard'
import WeatherDetails from '../components/WeatherDetails'
import { useNavigate } from 'react-router-dom';
import UnitSwitcher from '../components/UnitSwitcher';
import { searchAndAddCity } from '../services/weatherService';

function HomePage({miasta, onAddCity, onRemoveCity}) {
  const [wybraneMiasto, setWybraneMiasto] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();
  const [newCitySearch, setNewCitySearch] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [isSearch, setIsSearching] = useState(false);

  const handleClick = useCallback((miasto) => {
    console.log('Kliknieto miasto:', miasto.miasto);
    navigate(`/miasto/${miasto.id}`)
  }, []);
  
  const handleSearchNewCity = async() =>{
    const cityExist = miasta.some(
      miasto => miasta.miasto?.toLowerCase() === newCitySearch.toLowerCase()
    )
    if(cityExist){
      setSearchMessage('To miasto juz jest na liscie');
      setNewCitySearch('');
      return;
    }
    try{
      setIsSearching(true);
      setSearchMessage('Szukam miasta...');
      const newCity = await searchAndAddCity(newCitySearch);
      const cityExistById = miasta.some(miasto => miasto.id === newCity.id);
      if(cityExistById)
      {
        setSearchMessage('To miasto juz jest na liscie');
        setNewCitySearch('');
        return;
      }
      onAddCity(newCity);
      setSearchMessage('Dodano miasto:' + newCity.miasto);
      setNewCitySearch('')
    }catch(error){
      setSearchMessage('Blad: ' + error.message);
    }finally{
      setIsSearching(false);
    }
  }

  const filteredMiasta = useMemo(() =>
  {
    console.log({searchTerm});
    return miasta.filter(miasto => 
      miasto.miasto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [miasta, searchTerm]);

  return (
    <>
      <h1>Pogoda w Polsce</h1>
      <button onClick={() => navigate('/ulubione')}>Ulubione miasta</button>
        <UnitSwitcher />
      <div>
        <h3>Dodaj nowe miasto</h3>
        <input
          type="text"
          placeholder='Wpisz nazwe miasta'
          value={newCitySearch}
          onChange={(e) => setNewCitySearch(e.target.value)}
          onKeyPress={(e) => {
            if(e.key === "Enter") handleSearchNewCity();
          }}
          disabled={isSearch}
          />
          <button
            onClick={handleSearchNewCity}
            disabled={isSearch}>
              {isSearch ? 'Szukam' : 'Dodaj miasto'}
            </button>
      </div>
      <div>
        <input 
          type ="text"
          placeholder="Szukaj miasta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>
      <div className="cities-container">
        {filteredMiasta.map((dane) => (
          <div key={dane.id}>
            <WeatherCard 
              key={dane.id}
              cityId = {dane.id}
              miasto={dane.miasto} 
              temperatura={dane.aktualnaTemperatura} 
              onClick={() => handleClick(dane)}
            />
            <button onClick={() => onRemoveCity(dane.id)}>Usun miasto</button>
          </div>
          
        ))}
      </div>

      {wybraneMiasto && (
        <WeatherDetails miasto={wybraneMiasto} />
      )}
    </>
  )
}

export default HomePage