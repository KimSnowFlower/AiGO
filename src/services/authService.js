require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.registerUser = async ({ name, age, phone, password, region }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = 'INSERT INTO users (name, age, phone, password, region) VALUES (?, ?, ?, ?, ?)';
      
      // 데이터베이스에 사용자 정보 저장
      await db.query(sql, [name, age, phone, hashedPassword, region ]);
      
      return { message: 'User registered successfully' }; // 서비스 레벨에서 응답 반환
    } catch (error) {
      console.error('Registration service error:', error);
      throw new Error('Registration failed'); // 에러 처리
    }
};

// Login User
exports.loginUser = async ({ phone, password }) => {
    try {
      const sql = 'SELECT * FROM users WHERE phone = ?';

      const [results] = await db.query(sql, [phone]);

      if(results.length > 0) {
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          const token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '24' });
          return res.json({ message: 'Login successful', token});
        }
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
};