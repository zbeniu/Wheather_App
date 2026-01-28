import WeatherDetails from '../components/WeatherDetails'
import { useParams, useNavigate } from 'react-router-dom';

function CityDetailPage({miasta}){
    const {cityId} = useParams();
    const navigate = useNavigate();

    const miasto = miasta.find(x => x.id == parseInt(cityId));

    if(!miasto){
        return(
            <div>
                <h2>Nie znaleziono miasta</h2>
                <button onClick={() => navigate('/')}>Powrot do strony glownej</button>
            </div>
        );
    }
    
    return(
        <div>
            <WeatherDetails miasto={miasto}/>
            <button onClick={() => navigate('/')}>Powrot do strony glownej</button>
        </div>
    )
}
export default CityDetailPage