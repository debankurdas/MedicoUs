const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  isLive: {
    type: Boolean,
    default:true
  }
});

module.exports = mongoose.model('CategorySchema',categorySchema);
