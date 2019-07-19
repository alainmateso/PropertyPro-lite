import express from 'express';
import multiparty from 'connect-multiparty';
import userController from '../controllers/userController';
import ValidationMiddleware from '../middlewares/validation'

const { userLogin, createUser, changePassword } = userController;
const { userSignUpValidation } = ValidationMiddleware;

const multipartyMiddle = multiparty();
const userRouter = express.Router();

userRouter.post('/auth/signup', multipartyMiddle, userSignUpValidation, createUser);
userRouter.post('/auth/signin', multipartyMiddle, userLogin);
userRouter.post('/auth/:email/resetPassword', multipartyMiddle, changePassword);

export default userRouter;
