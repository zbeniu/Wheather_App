import { useSelector,useDispatch } from "react-redux";
import { toggleFavorite } from "../store/slice/favoritesSlice";

function FavoriteButton({cityId}) {
    const dispatch = useDispatch();

    const favoriteIds = useSelector((state) =>
        state.favorites.favoriteIds);

    const isFavourite = favoriteIds.includes(cityId);

    const handleClick = (e) => {
        e.stopPropagation();

        dispatch(toggleFavorite(cityId));
    }

    return(
        <button onClick={handleClick}>
                {isFavourite ? '⭐' : '☆'}
        </button>
    )
}
export default FavoriteButton;