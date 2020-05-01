const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const PaymentSchema = new mongoose.Schema({
    // intent: {
    //     type: String,
    //     required: true
    // },
    // orderID: {
    //     type: String,
    //     required: true
    // },
    // payerID: {
    //     type: String,
    //     required: true
    // },
    // paymentID: {
    //     type: String,
    //     required: true
    // },
    paymentToken: {
        type: String,
        required: true
    },
    // returnUrl: {
    //     type: String,
    //     required: true
    // }
})

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
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
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
    shippingAddress: AddressSchema,
    products: [ProductSchema],
    paymentInfo: PaymentSchema,
    courierInfo: CouriesSchema,
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Placed'
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('OrderSchema', OrderSchema);