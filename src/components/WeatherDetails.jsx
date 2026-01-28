import WeatherIcon from './WeatherIcon'
import { useSelector } from 'react-redux';
import { convertTemperature, getUnitSymbol } from '../utils/temperature';

function WeatherDetails({ miasto }) {
  if (!miasto) return null;

  const unit = useSelector((state) => state.settings.temperatureUnit);
  const unitSymbol = getUnitSymbol(unit);

  return (
    // GLÓWNY WRAPPER GRID (To on dzieli ekran na 2 kolumny)
    <div className="weather-dashboard">

      {/* --- LEWA KOLUMNA: 5-dniowa prognoza --- */}
      <div className="details-panel forecast">
        <h3>5-dniowa prognoza</h3>
        
        {Array.isArray(miasto.prognoza5Dni) && (
          <div className="forecast-row">
            {miasto.prognoza5Dni.map((dzień, idx) => (
              <div className="forecast-day" key={idx}>
                
                {/* Ikona i Dzień */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <WeatherIcon condition={dzień.pogoda} />
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{dzień.dzień}</span>
                </div>

                {/* Temperatura i Opis */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {convertTemperature(dzień.aktualnaTemperatura, unit)}{unitSymbol}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                    {dzień.pogoda}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- PRAWA KOLUMNA: Szczegóły bieżące --- */}
      <div className="details-panel">
        <h2>Szczegóły pogody dla {miasto.miasto}</h2>
        
        <div className="details-row">
          
          {/* Główna temperatura */}
          <div className="details-item">
            <strong>Temperatura:</strong>
            <div style={{ fontSize: '2rem' }}>
                {convertTemperature(miasto.aktualnaTemperatura, unit)}{unitSymbol}
            </div>
          </div>

          {/* Główna ikona */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <WeatherIcon condition={miasto.aktualnaPogoda} />
          </div>

          <div className="details-item">
            <strong>Warunki:</strong>
            <div>{miasto.aktualnaPogoda}</div>
          </div>

          <div className="details-item">
            <strong>Wiatr:</strong>
            <div>{miasto.aktualnyWiatr}</div>
          </div>

          <div className="details-item">
            <strong>Kierunek Wiatru:</strong>
            <div>{miasto.aktualnyKierunekWiatru}</div>
          </div>

          <div className="details-item">
            <strong>Zachmurzenie:</strong>
            <div>{miasto.aktualneZachmurzenie}</div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default WeatherDetails;