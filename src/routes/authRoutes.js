const express = require('express');
const authController = require('../controllers/authController');
const { validateAuthInput, validateLoginInput, validatePasswordChangeInput } = require('../middlewares/validationMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateAuthInput, authController.register);
router.post('/login', validateLoginInput, authController.login);
router.patch('/password', authenticateToken, validatePasswordChangeInput, authController.changePassword);

module.exports = router;