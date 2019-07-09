import express from 'express';
import multiparty from 'connect-multiparty';
import userController from '../controllers/userController';
import ValidationMiddleware from '../middlewares/validation'

const multipartyMiddle = multiparty();
const userRouter = express.Router();

userRouter.post('/auth/signup', multipartyMiddle, ValidationMiddleware.userSignUpValidation, userController.userSignUp);
userRouter.post('/auth/signin', multipartyMiddle, userController.userSignIn);

export default userRouter;
