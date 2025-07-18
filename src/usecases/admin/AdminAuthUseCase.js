const JwtService = require('../../services/JwtService');

class AdminAuthUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async register(adminData) {
    const existingAdmin = await this.adminRepository.findByEmail(adminData.email);
    if (existingAdmin) {
      throw new Error('Admin already exists');
    }

    const admin = await this.adminRepository.create(adminData);
    const token = JwtService.generateToken({ id: admin.id, email: admin.email }, 'admin');
    
    return { admin: { id: admin.id, name: admin.name, email: admin.email }, token };
  }

  async login(email, password) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await this.adminRepository.comparePassword(email, password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = JwtService.generateToken({ id: admin.id, email: admin.email }, 'admin');
    return { admin: { id: admin.id, name: admin.name, email: admin.email }, token };
  }
}

module.exports = AdminAuthUseCase;