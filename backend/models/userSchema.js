const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstname: {type:String,required:true,trim:true},
  lastname:{type:String,required:true,trim:true},
  mobile:{type:Number,required:true,trim:true, unique: true, required:true},
  email:{type:String,required:true,trim:true, unique: true, required:true},
  password:{type:String,required:true,trim:true},
  role:{type:String,required:true,trim:true,default:'User'},
  verifyEmail: {type: String, required: true, default: 'false'},
  hospitalName: {type: String},
  bloodBankName: {type: String}
})
mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
