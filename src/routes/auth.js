const express = require('express');
const authController = require('../controllers/authController');
const { validateAuthInput, validatePhoneInput } = require('../middlewares/validationMiddleware');

const router = express.Router();

// POST /api/auth/send-code - 인증 코드 전송
router.post('/send-code', validatePhoneInput, authController.sendVerificationCode);

// POST /api/auth/register - 회원가입
router.post('/register', validateAuthInput, authController.register);

// POST /api/auth/login - 로그인
router.post('/login', validateAuthInput, authController.login);

// Patch /api/auth/
router.patch('/password', validateAuthInput, authController.changePassword);

module.exports = router;