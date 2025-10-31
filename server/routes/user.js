const User = require('../model/User.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const authM = require('../middleware/authM');
// const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.get('/profile', authM, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
