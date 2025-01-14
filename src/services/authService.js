const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { generateToken } = require('../config/jwt');

// 회원가입
exports.registerUser = async ({ name, age, phone, password, region }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, age, phone, password, region)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(sql, [name, age, phone, hashedPassword, region]);

        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Error during registration:', error);
        throw new Error('Registration failed');
    }
};

// 로그인
exports.loginUser = async (phone, password) => {
    try {
        const sql = 'SELECT * FROM users WHERE phone = ?';
        const [results] = await db.query(sql, [phone]);

        if (results.length === 0) {
            throw new Error('Invalid credentials');
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken({ id: user.id, phone: user.phone });
        return { message: 'Login successful', token };
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
    }
};

// 비밀번호 변경
exports.changeUserPassword = async (userId, currentPassword, newPassword) => {
    try {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [results] = await db.query(sql, [userId]);

        if (results.length === 0) {
            throw new Error('User not found');
        }

        const user = results[0];
        const match = await bcrypt.compare(currentPassword, user.password);

        if (!match) {
            throw new Error('Invalid current password');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
        await db.query(updateSql, [hashedPassword, userId]);

        return { message: 'Password changed successfully' };
    } catch (error) {
        console.error('Error changing password:', error);
        throw new Error('Failed to change password');
    }
};
