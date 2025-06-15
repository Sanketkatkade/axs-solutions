const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // ✅ Correct import

router.post('/login', adminController.loginAdmin);
router.post('/signup', adminController.signupAdmin); // ✅ Now it works

module.exports = router;
