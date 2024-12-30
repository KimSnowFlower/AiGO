const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Dummy user storage (replace with DB in production)
const users = [];

exports.registerUser = async ({ name, age, studentId, department, username, password }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = 'INSERT INTO users (name, age, student_id, department, username, password) VALUES (?, ?, ?, ?, ?, ?)';
      
      // 데이터베이스에 사용자 정보 저장
      await db.query(sql, [name, age, studentId, department, username, hashedPassword]);
      
      return { message: 'User registered successfully' }; // 서비스 레벨에서 응답 반환
    } catch (error) {
      console.error('Registration service error:', error);
      throw new Error('Registration failed'); // 에러 처리
    }
};

// Login User
exports.loginUser = async (username, password) => {
    // Find User
    const user = users.find(user => user.username === username);

    if(!user) {
        throw new Error('Invalid credentials.');
    }

    // Check Passowrd
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        throw new Error('Invalid credentials.');
    }

    // Generate JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return { message: 'Login successful.', token };
};