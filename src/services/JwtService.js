const jwt = require('jsonwebtoken');

class JwtService {
  generateToken(payload, type = 'user') {
    return jwt.sign(
      { ...payload, type },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = new JwtService();