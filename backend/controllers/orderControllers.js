const express = require('express');
const orderSchema = require('../models/orderScehma');
exports.placeOrder = (req,res,next) => {
  const order = new orderSchema({
    uId: req.userData.uId,
    shippingAddress: req.body.shippingAddress,
    products: req.body.products,
    paymentInfo: req.body.paymentInfo,
    courierInfo: req.body.courierInfo,
    total: req.body.total,
    status: req.body.status,
    createdOn:req.body.createdOn
  })
  order.save()
  .then((result) => {
    res.json({ status: 'success', message: 'Order Placed!', data: result._id });
  })
  .catch((err) => {
    res.status(500).json({ status: 'failed', message: err });
  })
}

exports.getOrderDetails =  (req,res,next) => {
  orderSchema.findById(req.params.orderId)
  .then((result) => {
    res.json({ status: 'success', message: 'Order Found!', data: result });
  })
  .catch((err) => {
    res.status(500).json({ status: 'failed', message: err });
  })
}

exports.getUserOrders = (req,res,next) => {
  orderSchema.find({uId: req.userData.uId})
  .then((result) => {
    res.json({ status: 'success', message: 'Orders Found!', data: result })
  })
  .catch((err) => {
    res.status(500).json({ status: 'failed', message: err });
  })
}

exports.getAllOrders = (req,res,next) => {
  orderSchema.find({})
  .then((result) => {
    res.json({ status: 'success', message: 'Orders Found!', data: result })
  })
  .catch((err) => {
    res.status(500).json({ status: 'failed', message: err });
  })
}


