const User = require('../model/User.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const bcryptSaltRounds = parseInt(process.env.SALT_ROUNDS);

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const bcryptSalt = await bcrypt.genSalt(bcryptSaltRounds);
  try {
    var existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email has already been used' });
    existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, bcryptSalt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// forgot password. Send reset link
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Email not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 min
  await user.save();

  const link = `https://lieafline.vercel.app/reset-password/${token}`;
  const { resetPassword } = require('../utils/html.js');
  const html = resetPassword(user, link);
  await sendEmail(user.email, 'Reset Your Password', html);

  res.json({ message: 'Reset link sent' });
});

router.post('/reset-password/:token', async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = await bcrypt.hash(req.body.newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();
  await sendEmail(user.email, 'Reset Your Password', `You have successfully reset your password.`);

  res.json({ message: 'Password reset successful' });
});

module.exports = router;
