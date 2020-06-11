const bedSchema = require('../../models/hospitalModels/bedSchema');
exports.addBed = (req, res,next) => {
   const bed = new bedSchema({
     hospitalId: req.body.hospitalId,
     hospitalName:req.body.hospitalName,
     quantity:req.body.quantity,
     existingBed: req.body.existingBed,
     ward:req.body.ward,
     cost: req.body.cost,
     bedType: req.body.bedType
   });
   bed.save()
   .then((requestedData) => {
     res.status(200).json({
       status: 'Success',
       message:'Bed information are succesfully added',
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

 exports.getBed = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  const hospitalId = req.query.hospitalId
  let fetchBed;
  const bedQuery = bedSchema.find({hospitalId: hospitalId});
  if(pageSize && currentPage) {
    bedQuery.skip(pageSize * (currentPage -1)).limit(pageSize)
    bedQuery.then(result => {
      fetchBed = result;
      return bedSchema.count();
    })
    .then((finalCount) => {
      res.status(200).json({
        status: 'Success',
        message: 'bed Data is Fetched Successfully',
        bed: fetchBed,
        maxCount: finalCount
      })
    })
    .catch(error => {
      res.status(401).json({
        message: 'bed data is not added yet!',
        error:error
      });
    });
  } else {
    bedSchema.find()
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

 exports.getBedById = (req,res,next) => {
  const bedId = req.params.id;
  bedSchema.findById(bedId)
  .then((bed) =>{
    if (bed) {
      res.status(200).json({
        data: bed
      });
    } else {
      res.status(401).json({message: 'bed is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'bed data is not fetched!',
      error:error
    });
  });
}

exports.updatebedDetails = (req, res,next) => {

  const bed = new bedSchema({
    _id: req.body.id,
    hospitalId: req.body.hospitalId,
    hospitalName:req.body.hospitalName,
    quantity:req.body.quantity,
    existingBed: req.body.existingBed,
    ward:req.body.ward,
    cost: req.body.cost,
    bedType: req.body.bedType,
    date: req.body.date
  })
  console.log(bed);
  console.log(req.params.id);
  bedSchema.updateOne({_id : req.params.id},bed)
  .then(result => {
    if(result.n>0) {
      res.status(200).json({message: "Updated!",
      bed :{
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
      message: 'bed information is not updaated yet!',
      error: error
    });
  });
 }

 exports.deletebed= (req,res,next) => {
  bedSchema.deleteOne({_id: req.params.id})
  .then((result) => {
    if(result.n>0) {
      res.status(200).json({
        message: 'bed information is deleted'
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
      message: 'Bed info can not be deleted!'
    });
  });
}
exports.getDataFilterByhospitalId = (req,res,next) => {
  hospitalId = req.body.hospitalId;
  bedSchema.find({hospitalId: hospitalId})
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

