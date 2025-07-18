const AdminModel = require('../../models/AdminModel');
const Admin = require('../../domain/entities/Admin');

class AdminRepository {
  async create(adminData) {
    const admin = new AdminModel(adminData);
    const savedAdmin = await admin.save();
    return new Admin(savedAdmin.toObject());
  }

  async findByEmail(email) {
    const admin = await AdminModel.findOne({ email });
    return admin ? new Admin(admin.toObject()) : null;
  }

  async findById(id) {
    const admin = await AdminModel.findById(id);
    return admin ? new Admin(admin.toObject()) : null;
  }

  async comparePassword(email, password) {
    const admin = await AdminModel.findOne({ email });
    if (!admin) return false;
    return await admin.comparePassword(password);
  }
}

module.exports = AdminRepository;