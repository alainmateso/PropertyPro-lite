import express from 'express';
import PropertyControllerV2 from '../controllersV2/propertyControllerV2'

const { getAllProperties } = PropertyControllerV2;

const routerV2 = express.Router();

routerV2.get('/properties', getAllProperties);

export default routerV2;
