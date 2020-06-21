const express = require('express');
const orderSchema = require('../models/orderScehma');
const sendMail = require('@sendgrid/mail');
const axios = require("axios");
const env = 'LyPFYlqBxeRJ0pr3tNTaXWK5wfdC9hkosAGmnHbuZ78gUISj122vHGrQ6e3o4IzBfPstXOT7a05RNibu';
// require('dotenv').config();
//
const fast2sms = require('fast-two-sms');
const Secret_Key = 'sk_test_LOHHMD5I5GbVzu7qSn4nKGkq';
const stripe = require('stripe')(Secret_Key);
exports.placeOrder = (req, res, next) => {

    const order = new orderSchema({
        uId: req.userData.uId,
        emailAddress: req.body.order.emailAddress,
        mobile: req.body.order.mobile,
        shippingAddress: req.body.order.shippingAddress,
        products: req.body.order.products,
        paymentToken: req.body.paymentToken,
        courierInfo: req.body.order.courierInfo,
        total: req.body.order.total,
        status: req.body.order.status,
    })
    order.save()
        .then((result) => {
            console.log(result);
            resultId = result._id;
            email = result.emailAddress;
            mobile = result.mobile;
            createdOn = result.createdOn;
            const obj = {
                subject: 'Order Verification Mail',
                heading: "Welcome to Medico24/7",
                description: "Your order is succesfully placed,Your order id is:" + resultId + '.' +
                    " For further information,Go through this link:" + "http://localhost:4200/user/orders",
                paymentInfo: 'Mode of payment ==> CASH ON DELIVERY(C.O.D)',
                email: email
            };



            let htmlTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <body>
                    <h1>${obj.heading}</h1>
                    <p>${obj.description}</p>
                    <p>${obj.paymentInfo}</p>
                    </body>
                    </html>
            `;

            const callMethod = () => {
                axios({
                    method: "post",
                    url: "https://api.sendgrid.com/v3/mail/send",
                    headers: {
                        Authorization: "Bearer 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"
                    },
                    data: {
                        personalizations: [{
                            to: [{
                                email: email
                            }],
                            subject: `${obj.subject}`
                        }],
                        from: {
                            email: "debankurdas2013.dd@gmail.com",
                            name: "Debankur Das"
                        },
                        content: [{ type: "text/html", value: htmlTemplate }]
                    }
                });
            };

            callMethod();
            // -----------------------Mobile ------------------------
            let subject = 'Order Verification Mail';
            let heading = "Welcome to Medico24/7";
            let description = "Your order is succesfully placed,Your order id is:" + resultId + '.' +
                " For further information,Go through this link:" + "http://localhost:4200/user/orders";

            //console.log(subject, heading, description);
            let msg = subject + "==>" + heading + "," + description;
            console.log(msg);
            //let number = [];
            //number[0] = mobile;
            fast2sms.sendMessage({ authorization: env, message: msg, numbers: [mobile] });

            res.json({ status: 'success', message: 'Order Placed!', data: result._id });
        })
        .catch((err) => {
            res.status(500).json({ status: 'failed', message: err });
        })
}

exports.placeOrderbyCard = (req, res, next) => {
  console.log(req.body);
    const order = new orderSchema({
        uId: req.userData.uId,
        userName: req.body.name,
        emailAddress: req.body.order.emailAddress,
        mobile: req.body.order.mobile,
        shippingAddress: req.body.order.shippingAddress,
        products: req.body.order.products,
        paymentToken: req.body.token,
        courierInfo: req.body.order.courierInfo,
        total: req.body.order.total,
        status: req.body.order.status
    })
    order.save()
        .then((result) => {
            console.log(result);
            resultId = result._id;
            userName = result.userName;
            address = result.shippingAddress;
            email = result.emailAddress;
            mobile = result.mobile;
            price = result.total;
            createdOn = result.createdOn;
            token = result.paymentToken;
            const obj = {
                subject: 'Order Verification Mail',
                heading: "Welcome to Medico24/7",
                description: "Your order is succesfully placed,Your order id is:" + resultId + '.' +
                    " For further information,Go through this link:" + "http://localhost:4200/user/orders",
                paymentInfo: 'Mode of payment ==> CARD at' + createdOn,
                tokenId: 'For further information regarding succesfull or unsuccesfull payment please preserve this tokenId: ' + token,
                email: email
            };



            let htmlTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <body>
                    <h1>${obj.heading}</h1>
                    <p>${obj.description}</p>
                    <br>
                    <p>${obj.paymentInfo}</p>
                    <br>
                    <p><b> ${obj.tokenId} </b></p>
                    </body>
                    </html>
            `;

            const callMethod = () => {
                axios({
                    method: "post",
                    url: "https://api.sendgrid.com/v3/mail/send",
                    headers: {
                        Authorization: "Bearer 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"
                    },
                    data: {
                        personalizations: [{
                            to: [{
                                email: email
                            }],
                            subject: `${obj.subject}`
                        }],
                        from: {
                            email: "debankurdas2013.dd@gmail.com",
                            name: "Debankur Das"
                        },
                        content: [{ type: "text/html", value: htmlTemplate }]
                    }
                });
            };

            callMethod();
            // -----------------------Mobile ------------------------
            let subject = 'Order Verification Mail';
            let heading = "Welcome to Medico24/7";
            let description = "Your order is succesfully placed,Your order id is:" + resultId + '.' +
                " For further information,Go through this link:" + "http://localhost:4200/user/orders";
            //console.log(subject, heading, description);
            let msg = subject + "==>" + heading + "," + description;
            console.log(msg);
            //let number = [];
            //number[0] = mobile;
            fast2sms.sendMessage({ authorization: env, message: msg, numbers: [mobile] });
            var charge = stripe.charges.create({
                amount: price * 100,
                currency: 'INR',
                source: token
            }, (err, charge) => {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    status: 'success',
                    message: "Payment Done",
                    data: resultId
                })
            });
        })
        .catch((err) => {
            res.status(500).json({ status: 'failed', message: err });
        })
}

exports.getOrderDetails = (req, res, next) => {
    orderSchema.findById(req.params.orderId)
        .then((result) => {
            res.json({ status: 'success', message: 'Order Found!', data: result });
        })
        .catch((err) => {
            res.status(500).json({ status: 'failed', message: err });
        })
}

exports.getUserOrders = (req, res, next) => {
    orderSchema.find({ uId: req.userData.uId })
        .then((result) => {
            res.json({ status: 'success', message: 'Orders Found!', data: result })
        })
        .catch((err) => {
            res.status(500).json({ status: 'failed', message: err });
        })
}

exports.getAllOrders = (req, res, next) => {
    orderSchema.find()
        .then((result) => {
            res.json({ status: 'success', message: 'Orders Found!', data: result })
        })
        .catch((err) => {
            res.status(500).json({ status: 'failed', message: err });
        })
}

exports.statusChange = (req, res, next) => {
    console.log(req.body);
    orderId = req.body.id,
        status = req.body.status
    orderSchema.findByIdAndUpdate(orderId, {
            $set: {
                status: status
            }
        })
        .then((result) => {
            res.status(200).json({
                status: 'Success',
                data: result
            })
        }).catch((error) => {
            res.status(400).json({
                error: error,
                message: 'Some error is occured, try again'
            })
        })
}

exports.getOrderFilterBystatus = (req, res, next) => {
    status = req.body.status;
    orderSchema.find({ status: status })
        .then((result) => {
            res.status(200).json({
                data: result,
                status: 'Success'
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Please try again after some time',
                error: error,
                status: 'Failed'
            })
        })
}
