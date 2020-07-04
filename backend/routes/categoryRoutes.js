const categoryController = require('../controllers/categoryControllers');
const express = require('express');
const categoryRouter = express.Router();

categoryRouter.get('/',categoryController.getCategory);
categoryRouter.post('/', categoryController.postCategory);
categoryRouter.put(('/:id'), categoryController.updateCategoryLive);

module.exports = categoryRouter;
