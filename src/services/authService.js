require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const twilio_client = require('../config/twilio');
const { generateToken, verifyToken } = require('../config/jwt');

// 인증 코드 발송
exports.sendVerificationCode = async (phone) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분 유효

    // 데이터베이스에 인증 코드 저장
    const sql = `
      INSERT INTO verification_codes (phone, code, expires_at)
      VALUES (?, ?, ?)
    `;
    await db.query(sql, [phone, code, expiresAt]);

    // Twilio를 통해 인증 코드 전송
    await twilio_client.messages.create({
      body: `[AiGO] 인증 코드: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return { message: 'Verification code sent successfully' };
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw new Error('Failed to send verification code');
  }
};

// 회원가입 및 인증 코드 검증
exports.verifyCodeAndRegister = async ({ name, age, phone, password, region, code }) => {
  try {
    // 인증 코드 검증
    const codeSql = `
      SELECT * 
      FROM verification_codes 
      WHERE phone = ? AND code = ? AND expires_at > NOW() AND verified = FALSE
    `;
    const [rows] = await db.query(codeSql, [phone, code]);

    if (rows.length === 0) {
      throw new Error('Invalid or expired verification code');
    }

    // 인증 코드 상태 업데이트
    const updateCodeSql = `
      UPDATE verification_codes 
      SET verified = TRUE 
      WHERE id = ?
    `;
    await db.query(updateCodeSql, [rows[0].id]);

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 데이터 저장
    const userSql = `
      INSERT INTO users (name, age, phone, password, region) 
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(userSql, [name, age, phone, hashedPassword, region]);

    return { message: 'User registered successfully' };
  } catch (error) {
    console.error('Error during registration:', error);
    throw new Error('Registration failed');
  }
};

// 로그인
exports.loginUser = async ({ phone, password }) => {
  try {
    const sql = 'SELECT * FROM users WHERE phone = ?';
    const [results] = await db.query(sql, [phone]);

    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = generateToken({ id: user.id, phone: user.phone });
        return { message: 'Login successful', token };
      }
    }

    throw new Error('Invalid credentials');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};