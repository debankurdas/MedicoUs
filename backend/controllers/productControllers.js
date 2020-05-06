const productSchema = require('../models/productSchema');

exports.addProduct = (req, res,next) => {
 url = req.protocol+'://'+req.get('host');
  const product = new productSchema({
    productName: req.body.productName,
    categoryName:req.body.categoryName,
    description:req.body.description,
    imageUrl: url+'/images/'+ req.file.filename,
    price: req.body.price
  });
  product.save()
  .then((requestedData) => {
    res.status(200).json({
      status: 'Success',
      message:'products are succesfully added',
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
exports.updateProduct = (req, res,next) => {
  let imageUrl = req.body.imageUrl;
  if(req.file) {
    url = req.protocol+'://'+req.get('host');
    imageUrl = url+'/images/'+req.file.filename
  }
  const product = new productSchema({
    _id: req.body.id,
    productName: req.body.productName,
    categoryName: req.body.categoryName,
    description: req.body.description,
    imageUrl: imageUrl,
    price: req.body.price
  })
  console.log(product);
  console.log(req.params.id);
  productSchema.updateOne({_id : req.params.id},product)
  .then(result => {
    if(result.n>0) {
      res.status(200).json({message: "Updated!",
      product :{
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
      message: 'Post is not updaated yet!',
      error: error
    });
  });
 }
exports.getProduct = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  let fetchProduct;
  const productQuery = productSchema.find();
  if(pageSize && currentPage) {
    productQuery.skip(pageSize * (currentPage -1)).limit(pageSize)
    productQuery.then(result => {
      fetchProduct = result;
      return productSchema.count();
    })
    .then((finalCount) => {
      res.status(200).json({
        status: 'Success',
        message: 'Product Fetched Successfully',
        product: fetchProduct,
        maxCount: finalCount
      })
    })
    .catch(error => {
      res.status(401).json({
        message: 'Product is not fetched!',
        error:error
      });
    });
  } else {
    productSchema.find()
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
exports.getProductById = (req,res,next) => {
  const productId = req.params.id;
  productSchema.findById(productId)
  .then((product) =>{
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(401).json({message: 'Product is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'Product is not fetched!',
      error:error
    });
  });
}

exports.getproductByCategory = (req,res,next) => {
  const category = req.body.categoryName;
let productCount=0;
productSchema.find().estimatedDocumentCount().exec()
.then((countResult) => {
 productCount = countResult;
 return productCount;
})
.then((resultcount) => {
  productSchema.find({categoryName: category})
  .then((result) => {
    res.status(200).json({
      message:'Category wise product fetched!',
      data:result,
      count: resultcount
    });
  })
  .catch((err) => {
    res.status(200).json({
      message:'Product is not fetched!',
      error: err
    });
  });
});
}
exports.searchProduct = (req,res,next) => {
  const product = req.body.productName;
let productCount=0;
productSchema.find().estimatedDocumentCount().exec()
.then((countResult) => {
 productCount = countResult;
 return productCount;
})
.then((resultcount) => {
  productSchema.find({productName:{ $regex: product , $options:'i'}})
  .then((result) => {
    res.status(200).json({
      message:'Category wise product fetched!',
      data:result,
      count: resultcount
    });
  })
  .catch((err) => {
    res.status(200).json({
      message:'Product is not fetched!',
      error: err
    });
  });
});
}
 exports.deleteProduct = (req,res,next) => {
  productSchema.deleteOne({_id: req.params.id})
  .then((result) => {
    if(result.n>0) {
      res.status(200).json({
        message: 'Post is deleted'
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
