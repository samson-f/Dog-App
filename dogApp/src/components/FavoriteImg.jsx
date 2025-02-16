import { useState, useEffect, useContext } from "react";
import "./css/favoriteImg.css";
import { DogsContext } from "./Context";

function FavoriteImg({ src }) {
  const { favorites, removeFromFavorites, updateFavoriteName, updateProfile } =
    useContext(DogsContext);
  const [liked, setLiked] = useState();
  const [likedName, setLikedName] = useState();
  useEffect(
    () => setLiked(favorites.find((fav) => fav.imgSrc === src)?._id),
    [src, favorites]
  );
  useEffect(
    () => setLikedName(favorites.find((fav) => fav.imgSrc === src)?.name),
    [liked]
  );

  const updateName = () => {
    const newName = prompt("Enter new name");
    if (newName) {
      setLikedName(newName);
      updateFavoriteName(liked, newName);
    }
  };


  return (
    <div>
        <div className="imgContainer" onClick={() => removeFromFavorites(liked)}>
        <span className="heart">{liked ? "❤️" : "🤍"}</span>
        <img src={src} />
        </div>
        <div>
            <input disabled={true} value={likedName}></input>
            <button onClick={updateName}>✍️</button>
            <button onClick={() => updateProfile(liked)}>Make Profile</button>
        </div>
    </div>
  );
}

export default FavoriteImg;