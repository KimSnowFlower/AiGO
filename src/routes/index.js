const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const locationRoutes = require('./locationRoutes');
const profileRoutes = require('./profileRoutes');
//const routeHelperRoutes = require('./routeHelperRoutes');

// Auth Routes
router.use('/auth', authRoutes);

// Location Routes
router.use('/location', locationRoutes);

// Profile Routes - User
router.use('/user', profileRoutes);

// Route Helper Routes
//router.use('/route-helper', routeHelperRoutes);

module.exports = router;