const userSchema = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const axios = require("axios");
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
    const email = requestedData.email;
    const token = jwt.sign(
      {uId:user._id},
      'verify_email',
      {expiresIn: "1h"}
      );
    const obj = {
      subject:  'Email confirmation Mail',
      heading: "Welcome to Medico24/7",
      description:
        "Your token id is:"+token,
        email: email
    };



    let htmlTemplate = `
        <!DOCTYPE html>
          <html>
            <body>
              <h1>${obj.heading}</h1>
              <p>${obj.description}</p>
              <br>
              <p>"Please go through this link and verify your mailId by submiting this token:"+"http://localhost:4200/verifyMail"</p>
              <p><strong>You will automatically redirect to login page</strong></p>
            </body>
          </html>
          `;

      const callMethod = () => {
        axios({
          method: "post",
          url: "https://api.sendgrid.com/v3/mail/send",
          headers: {
            Authorization:
              "Bearer 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"
          },
          data: {
              personalizations: [
                  {
                    to: [
                      {
                        email: email
                      }
                    ],
                    subject: `${obj.subject}`
                  }
                ],
                from: {
                  email: "debankurdas2013.dd@gmail.com",
                  name: "Debankur Das"
                },
                content: [{ type: "text/html", value: htmlTemplate }]
              }
            });
          };

      callMethod();

    res.json({
      status: 'Success',
      message:'User Registration is successfull',
      data: requestedData,
      token: token
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
exports.tokenAgainstEmail = (req,res,next) => {
  email1 = req.body.email;
  userSchema.findOne({email: email1})
  .then((findingResult) => {
    const token = jwt.sign(
    {email: findingResult.email},
    'forgot_password',
    {expiresIn: "1h"}
    );
    id = findingResult._id;
    const obj = {
      subject:  'Password Reset Mail',
      heading: "Welcome to Medico24/7",
      description:
        "Your token id is:"+token,
        email: email1
    };



    let htmlTemplate = `
        <!DOCTYPE html>
          <html>
            <body>
              <h1>${obj.heading}</h1>
              <p>${obj.description}</p>
              <br>
              <p>"Please go through this link and reset your password by submiting this token and new password:"+"http://localhost:4200/forgotPassword"</p>
            </body>
          </html>
          `;

      const callMethod = () => {
        axios({
          method: "post",
          url: "https://api.sendgrid.com/v3/mail/send",
          headers: {
            Authorization:
              "Bearer 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"
          },
          data: {
              personalizations: [
                  {
                    to: [
                      {
                        email: email1
                      }
                    ],
                    subject: `${obj.subject}`
                  }
                ],
                from: {
                  email: "debankurdas2013.dd@gmail.com",
                  name: "Debankur Das"
                },
                content: [{ type: "text/html", value: htmlTemplate }]
              }
            });
          };

      callMethod();
    return res.status(200).send({
      token: token,
      id: id,
      message: 'Token is succesfully send'
    })

  })
}
exports.updatePassword = (req,res,next) => {
  const  userid = req.params.id;
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    console.log(hash)
    userSchema.findByIdAndUpdate(userid,{
      $set:{
        password: hash
      }
    })
    .then(result => {
        res.status(200).json({
          status: 'Success',
          message: "Your password is succesfully updated",
        });
    }).catch((error) => {
      res.status(500).json({
        message: 'Password cannot be updated ',
        error: error
      });
    });
  })
}
exports.login = (req,res,next) => {
  let user;
  userSchema.findOne({ email: req.body.email})
  .then((findingResult) => {
    if(!findingResult) {
      return res.status(404).json({
        status:'failed',
        message: 'Email is invalid'
      });
    } else if(findingResult.verifyEmail === 'false') {
      return res.status(400).json({
        status: 'failed',
        message: 'Atfirst verify your emailId'
      })
    }

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
 exports.updateStatus = (req, res,next) => {
 const  id = req.params.id;
 if (id != null) {
  userSchema.findByIdAndUpdate(id,{
    $set:{
       verifyEmail: req.body.verifyEmail
    }
  })
  .then((updatedResult) => {
    console.log(updatedResult);
     res.status(200).json({
       status: 'Success',
       message:'Your mail is verified',
       data:updatedResult
     });
  })
  .catch((error) =>{
    res.status(500).json({
      message:'At first try to create your mailId',
      error: error
    });
  });
 }
};

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

 exports.HospitaladminAssign = (req,res,next) => {
  bcrypt.hash(req.body.user.password,10)
  .then((hash) => {
   const user = new userSchema({
     firstname: req.body.user.firstname,
     lastname: req.body.user.lastname,
     mobile: req.body.user.mobile,
     email:req.body.user.email,
     password:hash,
     role: req.body.user.role,
     verifyEmail: req.body.verifyEmail,
     hospitalName: req.body.hospitalName
   });
   user.save()
   .then((requestedData) => {

     res.json({
       status: 'Success',
       message:'Admin Registration is successfull',
       data: requestedData,
     });
   })
   .catch((error) => {
     res.status(500).json({
       status: 'Failed',
       message: 'Admin registration failed!'
     });
   })
  })
 }
