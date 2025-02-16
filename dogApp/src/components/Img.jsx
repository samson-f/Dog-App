import { useState, useEffect, useContext } from "react";
import "./css/img.css";
import { DogsContext } from "./Context";

function Img({ src }) {
  const { activeUser, favorites, addToFavorites, removeFromFavorites } =
    useContext(DogsContext);
  const [liked, setLiked] = useState();
  useEffect(
    () => setLiked(favorites.find((fav) => fav.imgSrc === src)?._id),
    [src, favorites]
  );

  const likeImg = () => {
    if (!activeUser) return;

    if (liked) {
      removeFromFavorites(liked);
    } else {
      addToFavorites(src);
    }
  };

  return (
    <div className="imgContainer" onClick={likeImg}>
      <span className="heart">{liked ? "❤️" : "🤍"}</span>
      <img src={src} />
    </div>
  );
}

export default Img;