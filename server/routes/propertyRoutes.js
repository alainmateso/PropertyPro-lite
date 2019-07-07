import express from 'express';
import multiparty from 'connect-multiparty';
const multipartyMiddle = multiparty();

const router = express.Router();
import PropertyController from '../controllers/propertyController';

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById);
router.post('/property', multipartyMiddle, PropertyController.postNewProperty);
router.delete('/property/:id', PropertyController.deleteProperty);
router.patch('/property/:id', multipartyMiddle, PropertyController.updatePropertyDetails);
router.patch('/property/:id/sold', PropertyController.markAsSold)

export default router;
