const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

// 验证token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).send({ success: false, message: 'No token provided' });
  }
  
  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { verifyToken };