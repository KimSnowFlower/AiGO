require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 검증된 사용자 정보 추가
        req.user = decoded;

        // 다음 이동
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token', details: error.message });
    }
}