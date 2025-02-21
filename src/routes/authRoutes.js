import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateAuthInput, validateLoginInput, validatePasswordChangeInput } from '../middlewares/validationMiddleware.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validateAuthInput, authController.register);
router.post('/login', validateLoginInput, authController.login);
router.patch('/password', authenticateToken, validatePasswordChangeInput, authController.changePassword);

export default router;