const wishListSchema = require('../models/wishListSchema');

exports.getWishList = (req,res,next) => {
  wishListSchema.aggregate([
    {
      $match: { status: 'Active' }
    },
    {
      $lookup: {
        from: 'productschemas',
        localField: 'productId',
        foreignField: '_id',
        as: 'UserWishList'
      }
    }
  ])
  .then((result) => {
    res.json({
      status: 'Success',
      message: 'User wishList',
      data: result
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: 'failed',
      error: error
    })
  })
}

exports.createWishList = (req,res,next) => {
  const wishList = new wishListSchema({
    productId: req.body.productId,
    uId: req.userData.uId
  })
  wishList.save()
  .then((result) => {
    res.json({
      status: 'Success',
      message: 'Product is added to wishlist'
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: 'failed',
      error: error
    })
  })
}
