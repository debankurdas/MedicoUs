const categorySchema = require('../models/categorySchema');

exports.postCategory = (req, res,next) => {

  const categoryPost = req.body;
  categorySchema.insertMany(categoryPost)
  .then((requestedData) => {
    res.status(200).json({
      status: 'Success',
      message:'category is succesfully added',
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
exports.getCategory = (req,res,next) => {
  categorySchema.find()
  .then((categoryPost) =>{
    if (categoryPost) {
      res.status(200).json({
        status: 'Success',
        message:'category is succesfully fetched',
        data:categoryPost
      });
    } else {
      res.status(401).json({message: 'Post is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'Post is not fetched!',
      error:error
    });
  });
}
