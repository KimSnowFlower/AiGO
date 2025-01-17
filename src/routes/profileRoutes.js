const express = require('express');
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authenticateToken, profileController.getProfile);

module.exports = router;