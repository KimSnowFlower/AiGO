const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const locationRoutes = require('./location');

// Auth Routes
router.use('/auth', authRoutes);

// Location Routes
router.use('/location', locationRoutes);

module.exports = router;