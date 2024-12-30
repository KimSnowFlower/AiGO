const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');

// Auth Routes
router.use('/auth', authRoutes);

module.exports = router;