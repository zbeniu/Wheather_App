import { useSelector, useDispatch } from 'react-redux';

import { setTemperatureUnit } from '../store/slice/settingsSlice';

function UnitSwitcher() {
    const currentUnit = useSelector((state) => state.settings.temperatureUnit);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(setTemperatureUnit(e.target.value));
    };
    return (
        <div className="unit-switcher">
            <label>Jednostka temperatury: </label>
            <select value={currentUnit} onChange={handleChange}>
                <option value="C">Celsjusz (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
                <option value="K">Kelvin (K)</option>
            </select>
        </div>
    )
};
export default UnitSwitcher;