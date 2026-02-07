const express = require('express');
const { getUser, updateUser, getUserSettings, updateUserSettings, increaseStreak } = require('../controllers/userController');
const { authM } = require('../middleware/authM');

const router = express.Router();

router.get('/getUser', authM, getUser);
router.patch('/updateUser', authM, updateUser);

router.get('/settings', authM, getUserSettings);
router.patch('/settings', authM, updateUserSettings);
router.patch("/streak", authM, increaseStreak);

module.exports = router;
