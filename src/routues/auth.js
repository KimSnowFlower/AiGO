const express = require('expresss');
const { login, register } = require('../controllers/authController');
const router = express.Router();

// Post /api/auth/register
router.post('/register', register);

// Post /api/auth/login
router.post('/login', login);

module.exports = router;