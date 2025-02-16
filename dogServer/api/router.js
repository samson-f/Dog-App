const express = require('express');
const router = new express.Router();
const controller = require('./controller.js');

// USER ROUTES
router.post('/user', controller.addUser);
router.get('/users', controller.getAllUsers);
router.get('/user/:id', controller.getUserById);
router.patch('/user/:id/name', controller.updateNameById);
router.patch('/user/:id/profile', controller.updateProfileById);
router.delete('/user/:id', controller.deleteUserById);
router.delete('/user/:id/profile', controller.deleteProfileById);

// FAVORITEIMGS ROUTES
router.post('/user/:id/favorite', controller.addFavorite);
router.get('/user/:id/favorites', controller.getFavoritesById);
router.patch('/user/:id/favorite/:favId/name', controller.updateFavoriteNameById);
router.delete('/user/:id/favorite/:favId', controller.deleteFavoriteByID);
router.delete('/user/:id/favorite/:favId/name', controller.deleteFavoriteNameByID);

module.exports = router;