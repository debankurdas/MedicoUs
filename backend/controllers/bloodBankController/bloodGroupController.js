const bloodGroupSchema = require('../../models/bloodBankModels/bloodGroupSchema');
exports.addbloodGroup = (req, res,next) => {
  console.log(req.body);
   const bloodGroup = new bloodGroupSchema({
     bloodBankId: req.body.bloodBankId,
     bloodBankName:req.body.bloodBankName,
     bloodGroup: req.body.bloodGroup,
     quantity:req.body.quantity,
     existingBloodQuantity: req.body.existingBloodQuantity
   });
   bloodGroup.save()
   .then((requestedData) => {
     res.status(200).json({
       status: 'Success',
       message:'bloodGroup information are succesfully added',
       data: requestedData
     });
   })
   .catch((error) => {
     res.status(500).json({
       status: 'Failed',
       message: error
     });
   });
 }

 exports.getbloodGroup = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  const bloodBankId = req.query.bloodBankId
  let fetchbloodGroup;
  const bloodGroupQuery = bloodGroupSchema.find({bloodBankId: bloodBankId});
  if(pageSize && currentPage) {
    bloodGroupQuery.skip(pageSize * (currentPage -1)).limit(pageSize)
    bloodGroupQuery.then(result => {
      fetchbloodGroup = result;
      return bloodGroupSchema.count();
    })
    .then((finalCount) => {
      res.status(200).json({
        status: 'Success',
        message: 'bloodGroup Data is Fetched Successfully',
        bloodGroup: fetchbloodGroup,
        maxCount: finalCount
      })
    })
    .catch(error => {
      res.status(401).json({
        message: 'bloodGroup data is not added yet!',
        error:error
      });
    });
  } else {
    bloodGroupSchema.find()
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

 exports.getbloodGroupById = (req,res,next) => {
  const bloodGroupId = req.params.id;
  bloodGroupSchema.findById(bloodGroupId)
  .then((bloodGroup) =>{
    if (bloodGroup) {
      res.status(200).json({
        data: bloodGroup
      });
    } else {
      res.status(401).json({message: 'bloodGroup is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'bloodGroup data is not fetched!',
      error:error
    });
  });
}

exports.updatebloodGroupDetails = (req, res,next) => {

  const bloodGroup = new bloodGroupSchema({
    _id: req.body.id,
    bloodBankId: req.body.bloodBankId,
    bloodBankName:req.body.bloodBankName,
    bloodGroup: req.body.bloodGroup,
    quantity:req.body.quantity,
    existingBloodQuantity: req.body.existingBloodQuantity,
    date: req.body.date
  })
  bloodGroupSchema.updateOne({_id : req.params.id},bloodGroup)
  .then(result => {
    if(result.n>0) {
      res.status(200).json({message: "Updated!",
      bloodGroup :{
        ...result
      }
      });
    } else {
      res.status(401).json({
        message: "Unathorized Access!"
      })
    }

  }).catch((error) => {
    res.status(500).json({
      message: 'bloodGroup information is not updaated yet!',
      error: error
    });
  });
 }

 exports.deletebloodGroup= (req,res,next) => {
  bloodGroupSchema.deleteOne({_id: req.params.id})
  .then((result) => {
    if(result.n>0) {
      res.status(200).json({
        message: 'bloodGroup information is deleted'
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
      message: 'bloodGroup info can not be deleted!'
    });
  });
}

exports.getDataFilterBybloodBankId = (req,res,next) => {
  bloodBankId = req.body.bloodBankId;
  bloodGroupSchema.find({bloodBankId: bloodBankId})
  .then((result) => {
    res.status(200).json({
      data: result,
      status: 'Success'
    })
  })
  .catch((error) =>{
    res.status(400).json({
      message: 'Please try again after some time',
      error: error,
      status: 'Failed'
    })
  })
}

// exports.getDataFilterBybloodGroup = (req,res,next) => {
//   bloodGroup = req.body.bloodGroup;
//   console.log(bloodGroup);
//   bloodGroupSchema.find({bloodGroup: bloodGroup})
//   .then((result) => {
//     res.status(200).json({
//       data: result,
//       status: 'Success'
//     })
//   })
//   .catch((error) =>{
//     res.status(400).json({
//       message: 'Please try again after some time',
//       error: error,
//       status: 'Failed'
//     })
//   })
// }
