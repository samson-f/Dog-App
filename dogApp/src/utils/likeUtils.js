const getKey = user => 'likedDogs' + (user ? '_' + user : '');

export const isLiked = (item, user) => getAllLiked(user).includes(item);

export const addToLiked = (item, user) => {
  const likedStr = localStorage.getItem(getKey(user));
  const liked = likedStr ? JSON.parse(likedStr) : [];
   if (!liked.includes(item))
    liked.push(item);
  const likedToSave = JSON.stringify(liked);
  localStorage.setItem(getKey(user), likedToSave);
}

export const removeFromLiked = (item, user) => {
  const likedStr = localStorage.getItem(getKey(user));
  const liked = likedStr ? JSON.parse(likedStr) : [];
  if (liked.includes(item))
    liked.splice(liked.indexOf(item), 1);
  const likedToSave = JSON.stringify(liked);
  localStorage.setItem(getKey(user), likedToSave);
}

export const getAllLiked = (user) => {
  const likedStr = localStorage.getItem(getKey(user));
  return likedStr ? JSON.parse(likedStr) : [];
}