const { validationResult } = require('express-validator');
const authService = require('../services/authService');

// Register
exports.register = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, studentId, department, username, password } = req.body;

    try {
        const result = await authService.registerUser({ name, age, studentId, department, username, password});

        // 서비스에서 반환한 결과를 그대로 응답
        res.status(201).json(result);
    } catch (error) {
        console.error('Registration error:', error);

        res.status(500).json({ errror: 'Registration failed', details: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await authService.loginUser(username, password);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};