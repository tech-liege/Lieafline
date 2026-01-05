const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { resetPassword } = require('../utils/html.js');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const bcryptSaltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// 🧠 REGISTER USER
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check duplicates
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email has already been used" });

    existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    // Hash password
    const bcryptSalt = await bcrypt.genSalt(bcryptSaltRounds);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    // Save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Sign token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🧠 LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🧠 FORGOT PASSWORD (send reset link)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutes
    await user.save();

    const link = `https://lieafline.vercel.app/auth/reset-password/${token}`;
    const html = resetPassword(user, link);
    await sendEmail(user.email, 'Reset Your Password', html);

    res.json({ message: 'Reset link sent' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// 🧠 VERIFY RESET TOKEN
exports.verifyResetToken = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ isValid: false });
    res.json({ isValid: true });
  } catch (error) {
    console.error('Verify Reset Token Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 🧠 RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(req.body.newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    await sendEmail(user.email, 'Password Reset Successful', 'Your password has been reset.');
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
