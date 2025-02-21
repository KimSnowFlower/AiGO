import { validationResult } from 'express-validator';
import authService from '../services/authService.js';

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, age, phone, password, region } = req.body;
    try {
        const result = await authService.registerUser({ name, age, phone, password, region });
        res.status(201).json(result);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { phone, password } = req.body;
    try {
        const response = await authService.loginUser(phone, password);
        res.status(200).json(response);
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: 'Login failed', details: error.message });
    }
};

export const changePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    try {
        const result = await authService.changeUserPassword(userId, currentPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(400).json({ error: 'Password update failed', details: error.message });
    }
};