import express from 'express';
import multiparty from 'connect-multiparty';
const multipartyMiddle = multiparty();

const router = express.Router();
import PropertyController from '../controllers/propertyController';

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById);
router.post('/property', multipartyMiddle, PropertyController.postNewProperty);


export default router;
