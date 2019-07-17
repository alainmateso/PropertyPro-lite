import express from 'express';
import multiparty from 'connect-multiparty';
import ValidationMiddleware from '../middlewares/validation';
import { validateToken } from '../middlewares/auth';
import PropertyControllerV2 from '../controllersV2/propertyControllerV2';

const {
  getAllProperties,
  getSpecificType,
  getSpecificProperty,
  postNewProperty
} = PropertyControllerV2;

const {
  idValidation,
  createPropertyValidation
} = ValidationMiddleware

const multipartyMiddle = multiparty();

const routerV2 = express.Router();

routerV2.get('/properties', getAllProperties);
routerV2.get('/property', getSpecificType);
routerV2.get('/property/:id', idValidation, getSpecificProperty);
routerV2.post('/property', validateToken, multipartyMiddle, createPropertyValidation, postNewProperty);

// routerV2.post('/property', validateToken, multipartyMiddle, createPropertyValidation, postNewProperty);

export default routerV2;
