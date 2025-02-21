import express from 'express';
import * as locationController from '../controllers/locationController.js';

const router = express.Router();

router.get('/get-location', locationController.getLocation);

export default router;