const User = require('../model/User.js');
const Skill = require('../model/Skill.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authM } = require('../middleware/authM.js');
const { createSkill, getMySkills, getUserSkills, getSkillById, deleteSkill, updateSkill } = require('../controllers/skillController');

const router = express.Router();

// Protected routes (require login)
router.post('/create', authM, createSkill);
router.get('/user', authM, getMySkills);
router.delete('/:id', authM, deleteSkill);
router.patch('/:id', authM, updateSkill);

// Public routes
router.get('/user/:userId', getUserSkills);
router.get('/:id', getSkillById);

module.exports = router;
