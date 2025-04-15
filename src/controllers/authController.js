import { validationResult } from 'express-validator';
import { registerUser, loginUser, changeUserPassword} from '../services/authService.js';

export const register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, age, phone, password, region } = req.body;

    try {
        const result = await registerUser({ email, name, age, phone, password, region });
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

    const { email, password } = req.body;

    try {
        const response = await loginUser(email, password);
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
        const result = await changeUserPassword(userId, currentPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(400).json({ error: 'Password update failed', details: error.message });
    }
};

export const findUserId = async (req, res) => {
    const errrors = validationResult(req);

    if (!errrors.isEmpty()) {
        return res.status(400).json({ errors: errrors.array() });
    }

    const { userName, userPhone } = req.body;

    try {
        const result = await findUserId(userName, userPhone);
        res.status(200).json(result);
    } catch(cerror) {
        console.error('Error finding user ID:', cerror);
        res.status(400).json({ error: 'User ID retrieval failed', details: cerror.message });
    }
};

export const verifyUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, userName, userPhone } = req.body;

    try {
        const token = await verifyUser(email, userName, userPhone);
        res.status(200).json(token);
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(400).json({ error: 'User verification failed', details: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { token, newPassword } = req.body;

    try {
        const result = await resetPassword(token, newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(400).json({ error: 'Password reset failed', details: error.message });
    }
}