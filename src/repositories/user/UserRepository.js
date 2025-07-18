const UserModel = require('../../models/UserModel');
const User = require('../../domain/entities/User');

class UserRepository {
  async create(userData) {
    const user = new UserModel(userData);
    const savedUser = await user.save();
    return new User(savedUser.toObject());
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user ? new User(user.toObject()) : null;
  }

  async findById(id) {
    const user = await UserModel.findById(id);
    return user ? new User(user.toObject()) : null;
  }

  async comparePassword(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    return await user.comparePassword(password);
  }
}

module.exports = UserRepository;