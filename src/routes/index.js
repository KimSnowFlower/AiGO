const express = require('express');
const authRoutes = require('./authRoutes');
const locationRoutes = require('./locationRoutes');
const profileRoutes = require('./profileRoutes');
//const routeHelperRoutes = require('./routeHelperRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/location', locationRoutes);
router.use('/user', profileRoutes);
//router.use('/route-helper', routeHelperRoutes);

module.exports = router;