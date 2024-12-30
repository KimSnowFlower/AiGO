const express = require('expresss');
const { login, register } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validateAuthInput } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Post /api/auth/register
router.post('/register', validateAuthInput, register);

// Post /api/auth/login
router.post('/login', validateAuthInput, login);

module.exports = router;