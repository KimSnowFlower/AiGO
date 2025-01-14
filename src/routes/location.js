const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

router.get('/get-location', locationController.getLocation);

module.exports = router;