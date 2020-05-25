const express = require('express');
const orderSchema = require('../models/orderScehma');
const sendMail = require('@sendgrid/mail');
const axios = require("axios");
exports.placeOrder = (req,res,next) => {

  const order = new orderSchema({
    uId: req.userData.uId,
    emailAddress: req.body.emailAddress,
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
    console.log(result._id);
    resultId = result._id;
    email = result.emailAddress;
    const obj = {
      subject:  'Order Verification Mail',
      heading: "Welcome to Medico24/7",
      description:
        "Your order is succesfully placed,Your order id is:"+resultId+'.'+
        " For further information,Go through this link:"+"http://localhost:4200/user/orders",
        email: email
    };



    let htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <body>
            <h1>${obj.heading}</h1>
            <p>${obj.description}</p>
            </body>
            </html>
    `;

    const callMethod = () => {
      axios({
        method: "post",
        url: "https://api.sendgrid.com/v3/mail/send",
        headers: {
          Authorization:
            "Bearer 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"
        },
        data: {
            personalizations: [
                {
                  to: [
                    {
                      email: email
                    }
                  ],
                  subject: `${obj.subject}`
                }
              ],
              from: {
                email: "debankurdas2013.dd@gmail.com",
                name: "Debankur Das"
              },
              content: [{ type: "text/html", value: htmlTemplate }]
            }
          });
        };

        callMethod();
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


