const userSchema = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res,next) => {
 bcrypt.hash(req.body.password,10)
 .then((hash) => {
  const user = new userSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile: req.body.mobile,
    email:req.body.email,
    password:hash,
    dob: req.body.dob,
    role: req.body.role
  });
  user.save()
  .then((requestedData) => {
    res.json({
      status: 'Success',
      message:'User Registration is successfull',
      data: requestedData
    });
  })
  .catch((error) => {
    res.status(500).json({
      status: 'Failed',
      message: 'You have already registered with this emailId'
    });
  })
 })

};
exports.login = (req,res,next) => {
  let user;
  userSchema.findOne({ email: req.body.email})
  .then((findingResult) => {
    if(!findingResult) {
      return res.status(404).json({
        status:'failed',
        message: 'Email is invalid'
      });
    };

    user = findingResult;
    return bcrypt.compare(req.body.password, findingResult.password);
  })
  .then((result) => {
    if(!result) {
      return res.status(404).json({
        status: 'failed',
        message:'password is invalid'
      });
    }
    const token = jwt.sign(
      {uId:user._id},
      'strong_password',
      {expiresIn: "1h"}
      );
      res.json({
        status:'success',
        message:'Login Success',
        token: token,
        role: user.role
      });
  })
  .catch(err => {
    res.status(500).json({
      status: 'failed',
      message:'Authentication failed'
    })
  })
}
 exports.updateProfile = (req, res,next) => {
 const  userid = req.userData.uId;
 userSchema.findByIdAndUpdate(userid,{
   $set:{
     firstname:req.body.firstname,
     lastname:req.body.lastname,
     addressInfo:req.body.addressInfo
   }
 })
 .then((updatedResult) => {
   console.log(updatedResult);
  //  if(updatedResult.n>0) {
    res.status(200).json({
      status: 'Success',
      message:'Post is updated',
      post:updatedResult
    });
  //  } else {
  //    res.status(401).json({
  //      message: "Unauthorized access"
  //    });
  //  }

 })
 .catch((error) =>{
   res.status(500).json({
     message:'Post is not updated',
     error: error
   });
 });
};

exports.getUserById = (req,res,next) => {
  userSchema.findById(req.userData.uId)
  .then(user =>{
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'Post is not found'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Post is not fetched!'
    });
  });
}

