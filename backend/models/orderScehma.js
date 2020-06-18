const mongoose = require('mongoose');
const { stringify } = require('querystring');

const ObjectId = mongoose.Schema.Types.ObjectId;


const ProductSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const AddressSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    }
})

const CouriesSchema = new mongoose.Schema({
    courierName: {
        type: String
    },
    trackingNumber: {
        type: String
    }
})

let OrderSchema = new mongoose.Schema({
    uId: {
        type: ObjectId,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    userName: {
        type: String
    },
    paymentToken: {
        type: String,
        required: true
    },
    shippingAddress: AddressSchema,
    products: [ProductSchema],
    courierInfo: CouriesSchema,
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    deliveryOn: {
        type: Date
    },
    deliveryStatus: {
        type: String,
        default: 'Your order will be delivered within 2 days'
    }
});

module.exports = mongoose.model('OrderSchema', OrderSchema);