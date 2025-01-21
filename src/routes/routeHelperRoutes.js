import express from 'express';
import routeHelperController from '../controllers/routeHelperController';

const router = express.Router();

router.post('/routeHelper', routeHelperController.routeHelper);

export default router;