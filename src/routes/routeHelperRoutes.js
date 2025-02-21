import express from 'express';
import * as routeHelperController from '../controllers/routeHelperController.js';

const router = express.Router();

router.post('/routeHelper', routeHelperController.routeHelper);

export default router;