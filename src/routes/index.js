import express from 'express';
import authRoutes from './authRoutes.js';
import locationRoutes from './locationRoutes.js';
import profileRoutes from './profileRoutes.js';
//import routeHelperRoutes from './routeHelperRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/location', locationRoutes);
router.use('/user', profileRoutes);
//router.use('/route-helper', routeHelperRoutes);

export default router;