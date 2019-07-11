import express from 'express';
import multiparty from 'connect-multiparty';
import ValidationMiddleware from '../middlewares/validation';
import { validateToken } from '../middlewares/auth';
import PropertyController from '../controllers/propertyController';

const {
  viewAllProperties,
  viewPropertyById,
  postNewProperty,
  deleteProperty,
  updatePropertyDetails,
  markAsSold,
  viewPropertiesByType
} = PropertyController

const { createPropertyValidation, updatePropertyValidation } = ValidationMiddleware

const multipartyMiddle = multiparty();

const router = express.Router();

router.get('/properties', viewAllProperties);
router.get('/property/:id', viewPropertyById);
router.post('/property', validateToken, multipartyMiddle, createPropertyValidation, postNewProperty);
router.delete('/property/:id', validateToken, deleteProperty);
router.patch('/property/:id', validateToken, multipartyMiddle, updatePropertyValidation, updatePropertyDetails);
router.patch('/property/:id/sold', validateToken, markAsSold);
router.get('/property', viewPropertiesByType);

export default router;
