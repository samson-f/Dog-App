import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import './css/imageCollections.css';
import Img from './Img';
import FavoriteImg from './FavoriteImg'
import { DogsContext } from './Context';

const ImageCollections = (props) => {
  const {imgArr, emptyText, prefix} = props;

  if (!imgArr)
      return <div className='dogBox'>
          <span>{emptyText}</span>
        </div>
    return <div className='dogBox'>
      {imgArr.map((url, i) => (<Img key={prefix + i} src={url}/>))}
      </div>
}

export function RandomImgs() {
  const [images, setImages] = useState();
  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/image/random/20`)
      .then(res => res.json())
      .then(obj => setImages(obj.message));
  }, []);

  return <ImageCollections
            imgArr={images}
            emptyText='Loading...'
            prefix={'random'}
  />
}

export function BreedImgs() {
    const params = useParams();
    const breed = params.breed;
    const [images, setImages] = useState();
    const [emptyText, setEmptyText] = useState();
    useEffect(() => {
      setEmptyText('Loading...')  
      fetch(`https://dog.ceo/api/breed/${breed}/images/random/20`)
        .then(res => res.json())
        .then(obj => {
          if (obj.status == 'success')
            setImages(obj.message);
          else {
            setImages();
            setEmptyText(obj.message);
          }
        })
    }, [breed]);

    return <ImageCollections 
                imgArr={images} 
                emptyText={emptyText}
                prefix={breed}
            />
  }

export function FavorateImgs() {
  const {favorites, activeUser} = useContext(DogsContext);

  if (!activeUser) return <h1>No favorite images for guests😔</h1>

  if (!favorites)
      return <div className='dogBox'>
          <span>{'There are no favorates.'}</span>
        </div>
    return <div className='dogBox'>
      {favorites.map((fav, i) => (<FavoriteImg key={'favorites' + i} src={fav.imgSrc}/>))}
      </div>
}

// export function FavorateImgs() {
//   const {favorites, activeUser} = useContext(DogsContext);

//   if (!activeUser) return <h1>No favorite images for guests😔</h1>

//   return <ImageCollections 
//               imgArr={favorites.map(fav => fav.imgSrc)}  
//               emptyText='Thare are no favorates.'
//               prefix={favorites}
//           />
// }
