const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bloodSchema = new mongoose.Schema({
  bloodBankId: {
    type: ObjectId,
    required: true
  },
  bloodBankName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  existingBloodQuantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('BloodSchema', bloodSchema);
