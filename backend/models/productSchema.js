const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName:{
    type:String,
    required:true,
    trim:true,
  },
  categoryName:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  outOfStock:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('productSchema',productSchema);
