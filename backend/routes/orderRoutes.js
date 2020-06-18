const orderControllers = require('../controllers/orderControllers');
const express = require('express');
const authVerify = require('../middleware/auth');

const orderRouter = express.Router();

orderRouter.get('/admin', orderControllers.getAllOrders);
orderRouter.post('/', authVerify, orderControllers.placeOrder);
orderRouter.get('/:orderId', orderControllers.getOrderDetails);
orderRouter.get('/', authVerify, orderControllers.getUserOrders);
orderRouter.put('/statusChange', orderControllers.statusChange);
orderRouter.post('/orderFilter', orderControllers.getOrderFilterBystatus);
orderRouter.post('/payWithCard', authVerify, orderControllers.placeOrderbyCard);
// orderRoute.get('/admin/dashboard', OrderController.getDashBoardInfo);
// orderRoute.put('/', OrderController.updateOrderStatus);

module.exports = orderRouter;
