import { useSelector } from "react-redux";
import { convertTemperature, getUnitSymbol } from "../utils/temperature";
import FavoriteButton from "./FavoriteButton";
function WeatherCard(props){
    const className = `city-card ${props.selected ? 'selected' : ''}`;
    const unit = useSelector((state) => state.settings.temperatureUnit);
    const displayTemp = convertTemperature(props.temperatura, unit);
    const unitSymbol = getUnitSymbol(unit);
    return(
        <div className={className} onClick={props.onClick} role="button" tabIndex={0} onKeyPress={(e)=>{ if(e.key === 'Enter') props.onClick && props.onClick(); }}>
            <h2>{props.miasto}</h2>

            <FavoriteButton cityId={props.cityId}/>
            
            <div className="meta">
                <div className="temp">
                    {props.temperatura ? displayTemp + unitSymbol : '-'}
                </div>
                <div className="cond">{props.pogoda || ''}</div>
            </div>
        </div>
    )
}
export default WeatherCard;