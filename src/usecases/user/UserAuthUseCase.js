const JwtService = require('../../services/JwtService');

class UserAuthUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await this.userRepository.create(userData);
    const token = JwtService.generateToken({ id: user.id, email: user.email }, 'user');
    
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await this.userRepository.comparePassword(email, password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = JwtService.generateToken({ id: user.id, email: user.email }, 'user');
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }

  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { id: user.id, name: user.name, email: user.email };
  }
}

module.exports = UserAuthUseCase;