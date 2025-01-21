import express from 'express';
import authRoutes from './authRoutes';
import locationRoutes from './locationRoutes';
import profileRoutes from './profileRoutes';
//import routeHelperRoutes from './routeHelperRoutes';

const router = express.Router();

// Auth Routes
router.use('/auth', authRoutes);

// Location Routes
router.use('/location', locationRoutes);

// Profile Routes - User
router.use('/user', profileRoutes);

// Route Helper Routes
//router.use('/route-helper', routeHelperRoutes);

export default router;