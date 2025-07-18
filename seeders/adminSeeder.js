require('dotenv').config();
const mongoose = require('mongoose');
const AdminModel = require('../src/models/AdminModel');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Create admin
    const admin = new AdminModel({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();