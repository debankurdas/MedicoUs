const bedController = require('../../controllers/hospitalController/bedController');
const express = require('express');
const bedRouter = express.Router();

bedRouter.post('/bedAddition', bedController.addBed);
module.exports = bedRouter
