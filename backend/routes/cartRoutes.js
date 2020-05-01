const cartController = require('../controllers/cartController');
const express = require('express');
const authVerify = require('../middleware/auth');

const cartListRouter = express.Router();

cartListRouter.get('/',authVerify, cartController.getcartList);
cartListRouter.post('/', authVerify,cartController.createCartList);
cartListRouter.delete('/:id', cartController.deleteProduct);

module.exports = cartListRouter;
