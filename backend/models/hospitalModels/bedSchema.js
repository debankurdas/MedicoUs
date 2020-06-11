const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bedSchema = new mongoose.Schema({
  hospitalId: {
    type: ObjectId,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  bedType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  existingBed: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('bedSchema', bedSchema);
