const bedSchema = require('../../models/hospitalModels/bedSchema');
exports.addBed = (req, res,next) => {
   const bed = new bedSchema({
     hospitalId: req.body.hospitalId,
     hospitalName:req.body.hospitalName,
     quantity:req.body.quantity,
     existingBed: req.body.existingBed,
     ward:req.body.ward,
     cost: req.body.cost
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
