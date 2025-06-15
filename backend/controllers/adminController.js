const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signupAdmin = async (req, res) => {
  const { email, password } = req.body;

  console.log("Signup attempt:", email); // 👈 Add this

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists:", email); // 👈 Add this
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    console.log("Admin created:", newAdmin.email); // 👈 Add this

    res.status(201).json({ success: true, message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error.message); // 👈 Improved logging
    if (error.response?.data?.message) {
      setErr(error.response.data.message);
    } else {
      setErr('Signup failed');
    }
  }
  
};

