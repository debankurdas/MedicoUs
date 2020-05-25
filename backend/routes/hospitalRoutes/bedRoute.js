const bedController = require('../../controllers/hospitalController/bedController');
const express = require('express');
const bedRouter = express.Router();

bedRouter.post('/bedAddition', bedController.addBed);
bedRouter.put(('/:id'),bedController.updatebedDetails);
bedRouter.get('/:id', bedController.getBedById);
bedRouter.get('/', bedController.getBed);
bedRouter.delete('/:id', bedController.deletebed);
module.exports = bedRouter
