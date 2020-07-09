const cartListSchema = require('../models/cartListsSchema');
const mongoose = require('mongoose');
exports.getcartList = (req, res, next) => {
    // //(req.userData.uId);
    cartListSchema.aggregate([{
                $match: { uId: new mongoose.Types.ObjectId(req.userData.uId), status: 'Active' }
            },
            {
                $lookup: {
                    from: 'productschemas',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'UserCartList'
                }
            }
        ])
        .then((result) => {
            res.status(200).json({
                message: 'Product is added to cart',
                status: 'Success',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'failed',
                error: error
            })
        })
}

exports.createCartList = (req, res, next) => {
    const cartList = new cartListSchema({
        productId: req.body.productId,
        uId: req.userData.uId,
        quantity: req.body.quantity
    })
    cartList.save()
        .then((result) => {
            res.json({
                status: 'Success',
                message: 'Product is added to cartList',

            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'failed',
                error: error
            })
        })
}

exports.deleteProduct = (req, res, next) => {
    cartListSchema.deleteOne({ _id: req.params.id })
        .then((result) => {

            if (result.n >= 0) {
                res.status(200).json({
                    message: 'Product is deleted'
                });
            } else {
                res.status(401).json({
                    message: 'Unauthorized access!'
                })
            }

        })
        .catch(error => {
            res.status(500).json({
                message: 'Product can not be deleted!',
                error: error
            });
        });
}