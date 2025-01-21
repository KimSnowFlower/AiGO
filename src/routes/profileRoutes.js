import express from 'express';
import profileController from '../controllers/profileController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/profile', authenticateToken, profileController.getProfile);

export default router;