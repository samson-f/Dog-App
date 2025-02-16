const mongoose = require('mongoose');
const favoriteImg = require("../models/favoriteImgModel");

export function deleteFavorites(userId) {
      favoriteImg.deleteMany({ _id: mongoose.Types.ObjectId(userId)})
}

