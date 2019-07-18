import express from 'express';
import multiparty from 'connect-multiparty';
import userController from '../controllers/userController';
import ValidationMiddleware from '../middlewares/validation'

const { userLogin, createUser } = userController;
const { userSignUpValidation } = ValidationMiddleware;

const multipartyMiddle = multiparty();
const userRouter = express.Router();

userRouter.post('/auth/signup', multipartyMiddle, userSignUpValidation, createUser);
userRouter.post('/auth/signin', multipartyMiddle, userLogin);

export default userRouter;
