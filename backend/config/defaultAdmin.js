const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({ email: 'admin@example.com', password: hashedPassword });
      console.log('✅ Default admin created');
    } else {
      console.log('ℹ️ Admin already exists');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

module.exports = createDefaultAdmin;
