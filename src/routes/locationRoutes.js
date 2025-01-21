import express from 'express';
import locationController from '../controllers/locationController';

const router = express.Router();

router.get('/get-location', locationController.getLocation);

export default router;