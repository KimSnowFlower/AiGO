require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret'); // 기본값 추가
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token', details: error.message });
    }
};

module.exports = { authenticateToken };