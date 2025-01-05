const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const kakaoService = require('../services/kakaoLoginService');

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

exports.changePassword = async (req, res) => {
    const erros = validationResult(req);

    if(!erros.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    
    // 로그인된 사용자 ID
    const userId = req.user.id;

    try {
        // 비밀번호 변경 서비스 호출
        const result = await authService.changeUserPassword(userId, currentPassword, newPassword)
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(400).json({ error: 'Password update failed', details: error.message });
    }
};

exports.kakaoLogin = async (req, res) => {
    const { code } = req.query;

    try {
        // 1. 카카오에서 Access Token 받아오기
        const accessToken = await kakaoService.getKakaoToken(code);

        // 2. Access Token으로 사용자 정보 요청
        const userInfo = await kakaoService.getKakaoUserInfo(accessToken);

        // 3. 필요한 정보 추출 및 로직 처리
        const { id, kakao_account } = kakaoUser;
        const email = kakao_account.email;
        const nickname = kakao_account.profile.nickname;

        // 4. 사용자 정보 저장/업데이트 (DB 로직 추가)
        // 예: 사용자 정보가 없으면 새로 저장
        // await userRepository.findOrCreate({ id, email, nickname });

        // 5. 프론트엔드로 사용자 정보 전달
        res.status(200).json({ id, email, nickname });
    } catch (error) {
        console.error('Kakao login error:', error);
        res.status(500).json({ error: 'Kakao login failed', details: error.message });
    }
}