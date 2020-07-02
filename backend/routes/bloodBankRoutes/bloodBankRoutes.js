const bloodBankController = require('../../controllers/bloodBankController/bloodController');
const express = require('express');
const bloodBankRoutes = express.Router();
const upload = require('../../config/multer');
const authVerify = require('../../middleware/auth');

bloodBankRoutes.post('/addBloodBank',authVerify, upload.single('image'), bloodBankController.addBloodBank);
bloodBankRoutes.put(('/:id'), upload.single('image'),bloodBankController.updatebloodBankDetails);
bloodBankRoutes.post('/getData', authVerify, bloodBankController.getDataFilterBybranchArea);
bloodBankRoutes.get('/:id', bloodBankController.getBloodBankById);
bloodBankRoutes.get('/',authVerify,bloodBankController.getbloodBank);
bloodBankRoutes.delete('/:id', bloodBankController.deletebloodBank);
bloodBankRoutes.post('/location', bloodBankController.getBloodBankbyLocation);
bloodBankRoutes.post('/bloodBankSearch', bloodBankController.getBloodBankbySearch);

module.exports = bloodBankRoutes
