import express from 'express';
import multiparty from 'connect-multiparty';
import ValidationMiddleware from '../middlewares/validation';
import { validateToken } from '../middlewares/auth';
import PropertyController from '../controllers/propertyController';

const {
  getAllProperties,
  getSpecificProperty,
  postNewProperty,
  deleteProperty,
  updatePropertyDetails,
  markPropertyAsSold,
  getSpecificType
} = PropertyController

const { createPropertyValidation, updatePropertyValidation, idValidation } = ValidationMiddleware

const multipartyMiddle = multiparty();

const router = express.Router();

router.get('/properties', getAllProperties);
router.get('/property/:id', idValidation, getSpecificProperty);
router.post('/property', validateToken, multipartyMiddle, createPropertyValidation, postNewProperty);
router.delete('/property/:id', validateToken, idValidation, deleteProperty);
router.patch('/property/:id', validateToken, multipartyMiddle, updatePropertyValidation, updatePropertyDetails);
router.patch('/property/:id/sold', validateToken, idValidation, markPropertyAsSold);
router.get('/property', getSpecificType);

export default router;
