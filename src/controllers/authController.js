const { validationResult } = require('express-validator');
const authService = require('../services/authService');

// 인증 코드 전송
exports.sendVerificationCode = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone } = req.body;

    try {
        const result = await authService.sendVerificationCode(phone); 
        res.status(200).json(result);
    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(500).json({ error: 'Failed to send verification code', details: error.message });
    }
};

// 회원가입
exports.register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, phone, password, region, code } = req.body;

    try {
        const result = await authService.verifyCodeAndRegister({ 
            name, 
            age, 
            phone, 
            password, 
            region, 
            code // code 전달
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

// 로그인
exports.login = async (req, res) => {
    // 오류 변수명 수정
    const errors = validationResult(req);

    // 오류가 있으면 400 상태 코드로 응답
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    try {
        const response = await authService.loginUser(phone, password);

         // 로그인 성공 시 200 상태 코드로 응답
        res.status(200).json(response);
    } catch (error) {
        console.error('Login error:', error);
        // 에러 메시지 수정
        res.status(400).json({ error: 'Login failed', details: error.message });
    }
};

module.exports = {
    sendVerificationCode,
    register,
    login
};
