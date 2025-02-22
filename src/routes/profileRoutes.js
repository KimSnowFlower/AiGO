import express from 'express';
import * as profileController from '../controllers/profileController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, profileController.getUserProfile);

export default router;