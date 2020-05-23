const hospitalSchema = require('../../models/hospitalModels/hospitalSchema');


exports.addHospital = (req, res,next) => {
  url = req.protocol+'://'+req.get('host');
   const hospital = new hospitalSchema({
     hospitalName: req.body.hospitalName,
     adminId:req.userData.uId,
     speciality:req.body.speciality,
     imageUrl: url+'/images/'+ req.file.filename,
     status: req.body.status,
     description: req.body.description
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
       message: error
     });
   });
 }

 exports.getHospialById = (req,res,next) => {
  const hospitalId = req.params.id;
  productSchema.findById(hospitalId)
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

exports.updateProduct = (req, res,next) => {
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
  productSchema.updateOne({_id : req.params.id},hospital)
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
