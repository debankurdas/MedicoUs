const UserController = require('../controllers/userControllers');
const express = require('express');
const authVerify = require('../middleware/auth');

const userRouter = express.Router();

userRouter.get('/',authVerify, UserController.getUserById);
userRouter.post('/login', UserController.login);
userRouter.post('/registration', UserController.signUp);
userRouter.put('/', authVerify, UserController.updateProfile);

module.exports = userRouter;
