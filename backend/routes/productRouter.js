const productController = require('../controllers/productControllers');
const express = require('express');
const upload = require('../config/multer');
const productRouter = express.Router();


productRouter.get('/',productController.getProduct);
productRouter.get(('/:id'),productController.getProductById);
productRouter.post('/getproductByCategory',productController.getproductByCategory);
productRouter.post('/searchProduct',productController.searchProduct);
productRouter.post('/',upload.single('image'),productController.addProduct);
productRouter.put(('/:id'),productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
