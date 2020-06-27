const hospitalController = require('../../controllers/hospitalController/hospitalController');
const express = require('express');
const hospitalRouter = express.Router();
const upload = require('../../config/multer');
const authVerify = require('../../middleware/auth');

hospitalRouter.post('/addHospital',authVerify, upload.single('image'), hospitalController.addHospital);
hospitalRouter.put(('/:id'), upload.single('image'),hospitalController.updateHospitalDetails);
hospitalRouter.get('/:id', hospitalController.getHospialById);
hospitalRouter.get('/',authVerify,hospitalController.getHospital);
hospitalRouter.post('/getData', authVerify, hospitalController.getDataFilterBybranchName);
// hospitalRouter.post('/city', authVerify, hospitalController.getHospitalBycity)
hospitalRouter.post('/location', hospitalController.getHospitalByLocation);
hospitalRouter.post('/hospitalSearch', hospitalController.getHospitalByHospitalName);
hospitalRouter.post('/speciality', hospitalController.getHospitalBySpeciality);
hospitalRouter.delete('/:id', hospitalController.deleteHospital);

module.exports = hospitalRouter
