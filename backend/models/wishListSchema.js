const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const wishlistSchema = new mongoose.Schema({
  productId:{
    type:objectId,
    required:true
  },
  uId:{
    type:objectId,
    required:true
  },
  status:{
    type:String,
    default: 'Active'
  },
  createdOn:{
    type: Date,
    default: new Date()
  },
  modifiedOn:{
    type: Date
  }

});

module.exports = mongoose.model('WishlistSchema',wishlistSchema);
