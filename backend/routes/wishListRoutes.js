const wishListController = require('../controllers/wishListController');
const express = require('express');
const authVerify = require('../middleware/auth');

const wishListRouter = express.Router();

wishListRouter.get('/',wishListController.getWishList);
wishListRouter.post('/', authVerify,wishListController.createWishList);

module.exports = wishListRouter;
