const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, verifyResetToken, resetPassword } = require('../controllers/authController');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verifyResetToken', verifyResetToken);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
