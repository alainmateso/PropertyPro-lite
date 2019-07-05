import express from 'express';
const router = express.Router();
import PropertyController from '../controllers/propertyController';

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById)


export default router;
