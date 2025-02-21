const express = require('express');
const routeHelperController = require('../controllers/routeHelperController');

const router = express.Router();

router.post('/routeHelper', routeHelperController.routeHelper);

module.exports = router;