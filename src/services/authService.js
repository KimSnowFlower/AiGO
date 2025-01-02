require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const twilio_client = require('../config/twilio');

// Send VerificationCode to User
exports.sendVerificationCode = async (phone) => {
  try {
      // 6자리 랜덤 코드
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      // 5분 유효
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      // 데이터베이스에 인증 코드 저장
      const sql = 'INSERT INTO verification_codes (phone, code, expires_at) VALUES (?, ?, ?)';
      await db.query(sql, [phone, code, expiresAt]);

      // Twilio를 통해 인증 코드 전송
      await twilio_client.messages.create({
          body: `[AiGO] 인증 코드 발송 : ${code}`,
          from: '+123456780',
          to: phone
      });

      return { message: 'Verification code sent' };
  } catch (error) {
      console.error('Error sending verification code:', error);
      throw new Error('Failed to send verification code');
  }
};

// 회원가입
exports.verifyCodeAndRegister = async ({ name, age, phone, password, region, code }) => {
  const connection = await db.getConnection();

  try {
      await connection.beginTransaction();

      const codeSql = 'SELECT * FROM verification_codes WHERE phone = ? AND code = ? AND expires_at > NOW() AND verified = FALSE';
      const [rows] = await connection.query(codeSql, [phone, code]);

      if (rows.length === 0) {
          throw new Error('Invalid or expired verification code');
      }

      const updateCodeSql = 'UPDATE verification_codes SET verified = TRUE WHERE id = ?';
      await connection.query(updateCodeSql, [rows[0].id]);

      const hashedPassword = await bcrypt.hash(password, 10);
      const userSql = 'INSERT INTO users (name, age, phone, password, region) VALUES (?, ?, ?, ?, ?)';
      await connection.query(userSql, [name, age, phone, hashedPassword, region]);

      await connection.commit();
      return { message: 'User registered successfully' };
  } catch (error) {
      await connection.rollback();
      console.error('Error during registration:', error);
      throw new Error('Registration failed');
  } finally {
      connection.release();
  }
};

// Login User
exports.loginUser = async ({ phone, password }) => {
  try {
      const sql = 'SELECT * FROM users WHERE phone = ?';
      const [results] = await db.query(sql, [phone]);

      if (results.length > 0) {
          const user = results[0];
          const match = await bcrypt.compare(password, user.password);

          if (match) {
              const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
              return { message: 'Login successful', token };
          }
      }

      throw new Error('Invalid credentials');
  } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
  }
};

module.exports = {
  sendVerificationCode,
  verifyCodeAndRegister,
  loginUser
};