const express = require('express');
const authController = require('../controllers/authController');
const { validateAuthInput, validateLoginInput, validatePasswordChangeInput } = require('../middlewares/validationMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/auth/register - 회원가입
router.post('/register', validateAuthInput, authController.register);

// POST /api/auth/login - 로그인
router.post('/login', validateLoginInput, authController.login);

// PATCH /api/auth/password - 비밀번호 변경
router.patch('/password', authenticateToken, validatePasswordChangeInput, authController.changePassword);

module.exports = router;
