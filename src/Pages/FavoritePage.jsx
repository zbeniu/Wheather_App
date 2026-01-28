import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import UnitSwitcher from "../components/UnitSwitcher";

function FavoritePage({miasta}) {

    const navigate = useNavigate();
    const favoriteIds = useSelector((state) => 
        state.favorites.favoriteIds);

    const favoriteCitis = miasta.filter(m => favoriteIds.includes(m.id));

    return(
        <div>
            <h1>Ulubione Miasta</h1>
            <UnitSwitcher/>
            <button onClick={() => navigate('/')}>Powrót do listy</button>
            {favoriteCitis.length == 0 ?(
                <p>Nie masz jeszcze ulubionych misat.</p>
            )   :
            (
                <div>
                    {favoriteCitis.map((dane) => (
                        <WeatherCard 
                          key={dane.id}
                          cityId = {dane.id}
                          miasto={dane.miasto} 
                          temperatura={dane.aktualnaTemperatura} 
                          onClick={() => navigate(`/miasto/${dane.id}`)}
                        />
                    ))}
                </div>
            )
            }
        </div>
    )
}
export default FavoritePage;