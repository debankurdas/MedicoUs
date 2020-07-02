const bloodBankSchema = require('../../models/bloodBankModels/blooBankSchema');


exports.addBloodBank = (req, res, next) => {
  url = req.protocol+'://'+req.get('host');
   const bloodBank = new bloodBankSchema({
     bloodBankName: req.body.bloodBankName,
     adminId:req.userData.uId,
     imageUrl: url+'/images/'+ req.file.filename,
     status: req.body.status,
     description: req.body.description,
     state: req.body.state,
     city: req.body.city,
     branchArea: req.body.branchArea,
     address: req.body.address,
     pin: req.body.pin
   });
   bloodBank.save()
   .then((requestedData) => {
     res.status(200).json({
       status: 'Success',
       message:'bloodBank Data is succesfully added',
       data: requestedData
     });
   })
   .catch((error) => {
     res.status(500).json({
       status: 'Failed',
       message: 'Please give the exact address'
     });
   });
 }
 exports.getbloodBank = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  let fetchbloodBank;
  const adminId = req.userData.uId;
  const bloodBankQuery = bloodBankSchema.find({adminId:adminId});
  if(pageSize && currentPage) {
    bloodBankQuery.skip(pageSize * (currentPage -1)).limit(pageSize)
    bloodBankQuery.then(result => {
      fetchbloodBank = result;
      return bloodBankSchema.count();
    })
    .then((finalCount) => {
      res.status(200).json({
        status: 'Success',
        message: 'bloodBank Data is Fetched Successfully',
        bloodBank: fetchbloodBank,
        maxCount: finalCount
      })
    })
    .catch(error => {
      res.status(401).json({
        message: 'bloodBank data is not added yet!',
        error:error
      });
    });
  } else {
    bloodBankSchema.find()
    .then((result) => {
      res.status(200).json({
        status: 'Success',
        message: 'Product is fetched',
        data: result
      })
    })
     .catch(error => {
       res.status(401).json({
         message: 'Product is not fetched!',
         error:error
       });
     });
  }
}

 exports.getBloodBankById = (req,res,next) => {
  const bloodBankId = req.params.id;
  bloodBankSchema.findById(bloodBankId)
  .then((bloodBank) =>{
    if (bloodBank) {
      res.status(200).json(bloodBank);
    } else {
      res.status(401).json({message: 'bloodBank is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'bloodBank data is not fetched!',
      error:error
    });
  });
}

exports.updatebloodBankDetails = (req, res,next) => {
  let imageUrl = req.body.imageUrl;
  if(req.file) {
    url = req.protocol+'://'+req.get('host');
    imageUrl = url+'/images/'+req.file.filename
  }
  const bloodBank = new bloodBankSchema({
    _id: req.body.id,
    bloodBankName: req.body.bloodBankName,
    adminId: req.body.adminId,
    description: req.body.description,
    state: req.body.state,
    city: req.body.city,
    branchArea: req.body.branchArea,
    imageUrl: imageUrl,
    status: req.body.status,
    address: req.body.address,
    pin: req.body.pin
  })
  console.log(bloodBank);
  console.log(req.params.id);
  bloodBankSchema.updateOne({_id : req.params.id},bloodBank)
  .then(result => {
    if(result.n>0) {
      res.status(200).json({message: "Updated!",
      bloodBank :{
        ...result,
        imageUrl: result.imageUrl
      }
      });
    } else {
      res.status(401).json({
        message: "Unathorized Access!"
      })
    }

  }).catch((error) => {
    res.status(500).json({
      message: 'bloodBank information is not updaated yet!',
      error: error
    });
  });
 }

 exports.deletebloodBank= (req,res,next) => {
  bloodBankSchema.deleteOne({_id: req.params.id})
  .then((result) => {
    if(result.n>0) {
      res.status(200).json({
        message: 'bloodBank information is deleted'
      });
    }
    else {
      res.status(401).json({
        message: 'Unauthorized access!'
      })
    }

  })
  .catch(error => {
    res.status(500).json({
      message: 'Post can not be deleted!'
    });
  });
}

exports.getDataFilterBybranchArea = (req, res, next) => {
  branchArea = req.body.branchArea;
  bloodBankSchema.find({ branchArea: branchArea })
      .then((result) => {
          res.status(200).json({
              data: result,
              status: 'Success'
          })
      })
      .catch((error) => {
          res.status(400).json({
              message: 'Please try again after some time',
              error: error,
              status: 'Failed'
          })
      })
}

exports.getBloodBankbyLocation = (req, res, next) => {
  console.log(req.body);
  const state = req.body.state;
  const city = req.body.city;
  const area = req.body.area;
  if (state === 'ALL' && city === 'ALL' && area === '') {
      bloodBankSchema.find()
          .then((finalResult) => {
              res.status(200).json({
                  status: 'Success',
                  message: 'BloodBankData is Fetched Successfully',
                  data: finalResult
              })
          })
          .catch(error => {
              res.status(401).json({
                  message: 'BloodBankdata can not be fetched now',
                  error: error
              });
          });

  } else if (state !== '' && city === '' && area === '') {
      bloodBankSchema.find({ state: state })
          .then((finalResult) => {
              res.status(200).json({
                  status: 'Success',
                  message: 'BloodBankData is Fetched Successfully',
                  data: finalResult
              })
          })
          .catch(error => {
              res.status(401).json({
                  message: 'BloodBankdata can not be fetched now',
                  error: error
              });
          });
  } else if (state !== '' && city === 'ALL' && area === '') {
      bloodBankSchema.find({ state: state })
          .then((finalResult) => {
              res.status(200).json({
                  status: 'Success',
                  message: 'BloodBankData is Fetched Successfully',
                  data: finalResult
              })
          })
          .catch(error => {
              res.status(401).json({
                  message: 'BloodBankdata can not be fetched now',
                  error: error
              });
          });

  } else if (state !== '' && city !== 'ALL' && city !== '' && city !== 'undefined' && area === '') {
      bloodBankSchema.find({ state: state, city: city })
          .then((finalResult) => {
              res.status(200).json({
                  status: 'Success',
                  message: 'BloodBankData is Fetched Successfully',
                  data: finalResult
              })
          })
          .catch(error => {
              res.status(401).json({
                  message: 'BloodBankdata can not be fetched now',
                  error: error
              });
          });
  } else if (state !== '' && city !== '' && city !== 'undefined' && city !== 'ALL' && area === 'ALL' && area != '') {
      bloodBankSchema.find({ state: state, city: city })
          .then((finalResult) => {
              res.status(200).json({
                  status: 'Success',
                  message: 'BloodBankData is Fetched Successfully',
                  data: finalResult
              })
          })
          .catch(error => {
              res.status(401).json({
                  message: 'BloodBankdata can not be fetched now',
                  error: error
              });
          });
  } else if (state !== '' && city !== '' && city !== 'undefined' && city !== 'ALL' && (area != 'ALL' || area !== '' || area !== 'undefined')) {
      bloodBankSchema.find({ state: state, city: city, branchArea: area })
          .then((finalResult) => {
              res.status(200).json({
                  status: 'Success',
                  message: 'BloodBankData is Fetched Successfully',
                  data: finalResult
              })
          })
          .catch(error => {
              res.status(401).json({
                  message: 'BloodBankdata can not be fetched now',
                  error: error
              });
          });
  }

}

exports.getBloodBankbySearch = (req, res, next) => {
  console.log(req.body);
  const bloodBankName = req.body.bloodBankName;
  if (bloodBankName) {
      bloodBankSchema.find({ bloodBankName: { $regex: bloodBankName, $options: 'i' } })
          .then((finalResult) => {
              res.status(200).json({
                  status: 'Success',
                  message: 'BloodBank Data is Fetched Successfully',
                  data: finalResult
              })
          })
          .catch(error => {
              res.status(401).json({
                  message: 'BloodBank data can not be fetched now',
                  error: error
              });
          });
  }
}
