const User = require('../model/User.js');
const { Skill } = require('../model/Skill.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const authM = require('../middleware/authM.js');

const router = express.Router();

// get current user's skills
router.get('/user', authM, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id });
    res.json({ skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get a user's skills
router.get('/user/:userId', authM, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const skills = await Skill.find({ user: user?._id });
    if (skills) {
      res.json({ skills });
    } else {
      res.status(404).json({ message: 'No Skills Yet' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
