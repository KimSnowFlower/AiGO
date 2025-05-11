import bcrypt from 'bcryptjs';
import db from '../config/database.js';
import { generateToken, verifyToken } from '../config/jwt.js';

export const registerUser = async ({ email, name, age, phone, password, region }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `
            INSERT INTO users (email, name, age, phone, password, region)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await db.query(sql, [email, name, age, phone, hashedPassword, region]);

        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Error during registration:', error);
        throw new Error('Registration failed');
    }
};

export const loginUser = async (email, password) => {
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.query(sql, [email]);

        if (results.length === 0) {
            throw new Error('Invalid credentials');
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken({ id: user.id, email: user.email, name: user.name });

        return { message: 'Login successful', token };
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
    }
};

export const changeUserPassword = async (userId, currentPassword, newPassword) => {
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

export const findUserId = async (userName, userPhone) => {
    try {
        const sql = 'SELECT * FROM users WHERE name = ? AND phone = ?';
        const [results] = await db.query(sql, [userName, userPhone]);

        if (results.length === 0) {
            throw new Error('User not found');
        }

        const { email } = results[0];

        const [name, domain] = email.split('@');
        const maskedEmail = `${name.slice(0, 3)}***@${domain}`;


        return { message: 'User found', userId: maskedEmail };
    } catch (error) {
        console.error('Error finding user ID:', error);
        throw new Error('Failed to find user ID');
    }
};

export const verifyUser = async (email, userName, userPhone) => {
    try {
        const sql = 'SELECT * FROM users WHERE email = ? AND name = ? AND phone = ?';
        const [results] = await db.query(sql, [email, userName, userPhone]);

        if (results.length === 0) {
            throw new Error('User not found');
        }

        const token = generateToken({ id: results[0].id });
        return { message: 'User verification successful', token };
    } catch (error) {
        console.error('Error verifying user:', error);
        throw new Error('User verification failed');
    }
}

export const resetPassword = async (token, newPassword) => {
    try {
        const decoded = verifyToken(token);

        if (!decoded) {
            throw new Error('Invalid or expired token');
        }
        
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const sql = 'UPDATE users SET password = ? WHERE id = ?';

        await db.query(sql, [hashedPassword, userId]);

        return { message: 'Password reset successfully' };
    } catch (error) {
        console.error('Error resetting password:', error);
        throw new Error('Failed to reset password');
    }
}