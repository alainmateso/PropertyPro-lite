import express from 'express';
import multiparty from 'connect-multiparty';
import userController from '../controllers/userController';
import ValidationMiddleware from '../middlewares/validation'

const { userSignUp, userSignIn, resetPassword } = userController;
const { userSignUpValidation } = ValidationMiddleware;

const multipartyMiddle = multiparty();
const userRouter = express.Router();

userRouter.post('/auth/signup', multipartyMiddle, userSignUpValidation, userSignUp);
userRouter.post('/auth/signin', multipartyMiddle, userSignIn);
userRouter.post('/resetPassword', multipartyMiddle, resetPassword);

export default userRouter;
