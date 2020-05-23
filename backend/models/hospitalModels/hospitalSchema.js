const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true
  },
  adminId: {
    type: ObjectId,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Active'
  },
  description: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('hospitalScehma', hospitalSchema);
