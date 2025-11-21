const express = require('express');
const { getUser, updateUser, getUserSettings, updateUserSettings } = require('../controllers/userController');
const { authM } = require('../middleware/authM');

const router = express.Router();

router.get('/user', authM, getUser);
router.patch('/user', authM, updateUser);

router.get('/settings', authM, getUserSettings);
router.patch('/settings', authM, updateUserSettings);

module.exports = router;
