const UserController = require('../controllers/userControllers');
const express = require('express');
const authVerify = require('../middleware/auth');

const userRouter = express.Router();

userRouter.get('/',authVerify, UserController.getUserById);
userRouter.get('/:userId',authVerify, UserController.getUserByparamsId);
userRouter.post('/login', UserController.login);
userRouter.post('/registration', UserController.signUp);
userRouter.post('/tokenCreation', UserController.tokenAgainstEmail);
userRouter.post('/adminAssign', UserController.HospitaladminAssign);
userRouter.put('/:id', UserController.updateProfile);
userRouter.put('/verifyEmail/:id', UserController.updateStatus);
userRouter.put('/updatePassword/:id', UserController.updatePassword);
userRouter.post('/contact', UserController.contact);

module.exports = userRouter;
