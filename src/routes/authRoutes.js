import express from 'express';
import authController from '../controllers/authController';
import { validateAuthInput, validateLoginInput, validatePasswordChangeInput } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// POST /api/auth/register - 회원가입
router.post('/register', validateAuthInput, authController.register);

// POST /api/auth/login - 로그인
router.post('/login', validateLoginInput, authController.login);

// PATCH /api/auth/password - 비밀번호 변경
router.patch('/password', authenticateToken, validatePasswordChangeInput, authController.changePassword);

export default router;
