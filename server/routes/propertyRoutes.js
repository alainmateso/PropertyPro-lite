import express from 'express';
import multiparty from 'connect-multiparty';
import ValidationMiddleware from '../middlewares/validation'
import PropertyController from '../controllers/propertyController';

const multipartyMiddle = multiparty();

const router = express.Router();

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById);
router.post('/property', multipartyMiddle, ValidationMiddleware.createPropertyValidation, PropertyController.postNewProperty);
router.delete('/property/:id', PropertyController.deleteProperty);
router.patch('/property/:id', multipartyMiddle, ValidationMiddleware.updatePropertyValidation, PropertyController.updatePropertyDetails);
router.patch('/property/:id/sold', PropertyController.markAsSold);
router.get('/property', PropertyController.viewPropertiesByType);

export default router;
