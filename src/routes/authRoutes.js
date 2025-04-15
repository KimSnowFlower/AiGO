import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateAuthInput, validateLoginInput, validatePasswordChangeInput, validateFindUserId, 
    validateVerifyUser, validateResetPassword} from '../middlewares/validationMiddleware.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validateAuthInput, authController.register);
router.post('/login', validateLoginInput, authController.login);
router.patch('/password', authenticateToken, validatePasswordChangeInput, authController.changePassword);
router.post('/find-user-id', validateFindUserId, authController.findUserId);
router.post('/verify-user', validateVerifyUser, authController.verifyUser);
router.post('/reset-password', validateResetPassword, authController.resetPassword);

export default router;