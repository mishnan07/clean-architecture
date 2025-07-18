const JwtService = require('../services/JwtService');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = JwtService.verifyToken(token);
    if (decoded.type !== 'user') {
      return res.status(403).json({ error: 'Access denied. Invalid token type.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = JwtService.verifyToken(token);
    if (decoded.type !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Invalid token type.' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin
};