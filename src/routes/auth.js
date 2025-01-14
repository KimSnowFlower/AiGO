const express = require('express');
const authController = require('../controllers/authController');
const { validateAuthInput } = require('../middlewares/validationMiddleware');
const { authenticateToken } = require('../middlewares/jwtMiddleware');

const router = express.Router();

// POST /api/auth/register - 회원가입
router.post('/register', validateAuthInput, authController.register);

// POST /api/auth/login - 로그인
router.post('/login', validateAuthInput, authController.login);

// PATCH /api/auth/password - 비밀번호 변경
router.patch('/password', authenticateToken, validateAuthInput, authController.changePassword);

module.exports = router;
