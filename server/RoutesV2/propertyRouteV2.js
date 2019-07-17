import express from 'express';
import ValidationMiddleware from '../middlewares/validation'
import PropertyControllerV2 from '../controllersV2/propertyControllerV2'

const {
  getAllProperties,
  getSpecificType,
  getSpecificProperty
} = PropertyControllerV2;

const { idValidation } = ValidationMiddleware

const routerV2 = express.Router();

routerV2.get('/properties', getAllProperties);
routerV2.get('/property', getSpecificType);
routerV2.get('/property/:id', idValidation, getSpecificProperty);

export default routerV2;
