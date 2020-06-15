const bloddBankController = require('../../controllers/bloodBankController/bloodController');
const express = require('express');
const bloodBankRoutes = express.Router();
const upload = require('../../config/multer');
const authVerify = require('../../middleware/auth');

bloodBankRoutes.post('/addBloodBank',authVerify, upload.single('image'), bloddBankController.addBloodBank);
bloodBankRoutes.put(('/:id'), upload.single('image'),bloddBankController.updatebloodBankDetails);
bloodBankRoutes.post('/getData', authVerify, bloddBankController.getDataFilterBybranchArea);
bloodBankRoutes.get('/:id', bloddBankController.getBloodBankById);
bloodBankRoutes.get('/',authVerify,bloddBankController.getbloodBank);
bloodBankRoutes.delete('/:id', bloddBankController.deletebloodBank);


module.exports = bloodBankRoutes
