const hospitalSchema = require('../../models/hospitalModels/hospitalSchema');


exports.addHospital = (req, res,next) => {
  url = req.protocol+'://'+req.get('host');
   const hospital = new hospitalSchema({
     hospitalName: req.body.hospitalName,
     adminId:req.userData.uId,
     speciality:req.body.speciality,
     imageUrl: url+'/images/'+ req.file.filename,
     status: req.body.status,
     description: req.body.description,
     address: req.body.address
   });
   hospital.save()
   .then((requestedData) => {
     res.status(200).json({
       status: 'Success',
       message:'Hospital Data is succesfully added',
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
 exports.getHospital = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  let fetchHospital;
  const adminId = req.userData.uId;
  const hospitalQuery = hospitalSchema.find({adminId:adminId});
  if(pageSize && currentPage) {
    hospitalQuery.skip(pageSize * (currentPage -1)).limit(pageSize)
    hospitalQuery.then(result => {
      fetchHospital = result;
      return hospitalSchema.count();
    })
    .then((finalCount) => {
      res.status(200).json({
        status: 'Success',
        message: 'Hospital Data is Fetched Successfully',
        hospital: fetchHospital,
        maxCount: finalCount
      })
    })
    .catch(error => {
      res.status(401).json({
        message: 'Hospital data is not added yet!',
        error:error
      });
    });
  } else {
    hospitalSchema.find()
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

 exports.getHospialById = (req,res,next) => {
  const hospitalId = req.params.id;
  hospitalSchema.findById(hospitalId)
  .then((hospital) =>{
    if (hospital) {
      res.status(200).json(hospital);
    } else {
      res.status(401).json({message: 'Hospital is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'Hospital data is not fetched!',
      error:error
    });
  });
}

exports.updateHospitalDetails = (req, res,next) => {
  let imageUrl = req.body.imageUrl;
  if(req.file) {
    url = req.protocol+'://'+req.get('host');
    imageUrl = url+'/images/'+req.file.filename
  }
  const hospital = new hospitalSchema({
    _id: req.body.id,
    hospitalName: req.body.hospitalName,
    adminId: req.body.adminId,
    description: req.body.description,
    imageUrl: imageUrl,
    speciality: req.body.speciality,
    status: req.body.status
  })
  console.log(hospital);
  console.log(req.params.id);
  hospitalSchema.updateOne({_id : req.params.id},hospital)
  .then(result => {
    if(result.n>0) {
      res.status(200).json({message: "Updated!",
      hospital :{
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
      message: 'Hospital information is not updaated yet!',
      error: error
    });
  });
 }

 exports.deleteHospital= (req,res,next) => {
  hospitalSchema.deleteOne({_id: req.params.id})
  .then((result) => {
    if(result.n>0) {
      res.status(200).json({
        message: 'Hospital information is deleted'
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
