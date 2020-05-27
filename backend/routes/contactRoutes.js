const contactController = require('../controllers/contactController');

const express = require('express');

const contactRoutes = express.Router();

contactRoutes.post('', contactController.contact);

module.exports = contactRoutes;
