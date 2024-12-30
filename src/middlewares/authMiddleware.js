const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.hearders['authorization']?.split(' ')[i];

    if(!token)
        return res.status(401).json({ message: 'Access token is missing or invalid.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 토큰의 payload 정보를 req.user에 저장
        req.user = decoded;

        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}