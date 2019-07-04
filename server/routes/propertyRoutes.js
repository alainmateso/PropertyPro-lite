import express from 'express';
const router = express.Router();
import PropertyController from '../controllers/propertyController';

router.get('/properties', PropertyController.viewAllProperties);


export default router;
