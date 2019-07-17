import express from 'express';
import PropertyControllerV2 from '../controllersV2/propertyControllerV2'

const {
  getAllProperties,
  getSpecificType
} = PropertyControllerV2;

const routerV2 = express.Router();

routerV2.get('/properties', getAllProperties);
routerV2.get('/property', getSpecificType);

export default routerV2;
