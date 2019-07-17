import express from 'express';
import multiparty from 'connect-multiparty';
import ValidationMiddleware from '../middlewares/validation';
import userControllerV2 from '../controllersV2/userControllerV2';

const { createUser } = userControllerV2;
const { userSignUpValidation } = ValidationMiddleware

const multipartyMiddle = multiparty();
const userRouterV2 = express.Router();

userRouterV2.post('/auth/signup', multipartyMiddle, userSignUpValidation, createUser);

export default userRouterV2;
