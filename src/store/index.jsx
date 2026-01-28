import {configureStore} from '@reduxjs/toolkit';
import settingsReducer from "./slice/settingsSlice"
import favoriteReducer from "./slice/favoritesSlice"

const loadState = () =>{
    try{
        const serializedState = localStorage.getItem(`weatherAppStatate`);
        if (serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(err){
        console.error("Błąd ładowania stany z localstorage", err);
        return undefined;
    }
};

const saveState = (state) =>{
    try {
        const stateToSave = {
            settings: state.settings,
            favorites: state.favorites,
        };
        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem(`weatherAppStatate`, serializedState)
    } catch (err) {
        console.error("Błąd zapisu: ", err);
    }
};

const preloadedState = loadState();

const store = configureStore({
    reducer:{
        settings: settingsReducer,
        favorites: favoriteReducer,
    },
    preloadedState,
});

store.subscribe(() =>{
    saveState(store.getState());
})

export default store;