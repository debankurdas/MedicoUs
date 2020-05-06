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
      message: 'You have already registered with this credentials'
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
//  exports.updateProfile = (req, res,next) => {
//  const  userid = req.userData.uId;
//  userSchema.findByIdAndUpdate(userid,{
//    $set:{
//      firstname:req.body.firstname,
//      lastname:req.body.lastname,
//      addressInfo:req.body.addressInfo
//    }
//  })
//  .then((updatedResult) => {
//    console.log(updatedResult);
//   //  if(updatedResult.n>0) {
//     res.status(200).json({
//       status: 'Success',
//       message:'Post is updated',
//       post:updatedResult
//     });
//   //  } else {
//   //    res.status(401).json({
//   //      message: "Unauthorized access"
//   //    });
//   //  }

//  })
//  .catch((error) =>{
//    res.status(500).json({
//      message:'Post is not updated',
//      error: error
//    });
//  });
// };

exports.getUserById = (req,res,next) => {
  userSchema.findById(req.userData.uId)
  .then((result) =>{
      res.status(200).json({
        status: 'Success',
        data: result
      });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Post is not fetched!',
      error:error
    });
  });
}

exports.getUserByparamsId = (req,res,next) => {
  const userId = req.params.userId;
  if(userId) {
    userSchema.findById(userId)
    .then((userData) =>{
      if (userData) {
        res.status(200).json({
          _id: userData._id,
          firstname: userData.firstname,
          lastname: userData.lastname,
          mobile: userData.mobile,
          email: userData.email
        });
      } else {
        res.status(401).json({message: 'UserData is not fetched'});
      }
    })
    .catch(error => {
      res.status(401).json({
        message: 'User is not fetched!',
        error:error
      });
    });
  } else {
    res.status(200).json({
      message: 'Unexpected Id'
    })
  }
}
exports.updateProfile = (req, res,next) => {
  const  userid = req.params.id;
  console.log(userid);
  userSchema.findByIdAndUpdate(userid,{
    $set:{
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      mobile:req.body.mobile,
      email:req.body.email
    }
  })
  .then(result => {
    console.log(result);
      res.status(200).json({message: "Updated!",
      user :{
        ...result
      }
      });
  }).catch((error) => {
    res.status(500).json({
      message: 'UserData is not updaated yet!',
      error: error
    });
  });
 };
