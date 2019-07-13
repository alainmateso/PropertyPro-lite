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
  viewPropertiesByType,
  viewMyProperties
} = PropertyController

const { createPropertyValidation, updatePropertyValidation, idValidation } = ValidationMiddleware

const multipartyMiddle = multiparty();

const router = express.Router();

router.get('/properties', viewAllProperties);
router.get('/property/:id', idValidation, viewPropertyById);
router.post('/property', validateToken, multipartyMiddle, createPropertyValidation, postNewProperty);
router.delete('/property/:id', validateToken, idValidation, deleteProperty);
router.patch('/property/:id', validateToken, multipartyMiddle, updatePropertyValidation, updatePropertyDetails);
router.patch('/property/:id/sold', validateToken, idValidation, markAsSold);
router.get('/property', viewPropertiesByType);
router.get('/myProperties', validateToken, viewMyProperties);

export default router;
