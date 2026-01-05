const User = require('../model/User.js');
const Skill = require('../model/Skill.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authM } = require('../middleware/authM.js');
const {
  createSkill,
  getMySkills,
  getUserSkills,
  getSkillById,
  deleteSkill,
  updateSkill,
  getCategories,
  getNiches,
  getExtPhase,
  getPhases,
} = require("../controllers/skillController");

const router = express.Router();

// Protected routes (require login)
router.post("/create", authM, createSkill);
router.get("/user", authM, getMySkills);
router.delete("/:id", authM, deleteSkill);
router.patch("/:id", authM, updateSkill);
// Public routes
router.get("/user/:userId", getUserSkills);
router.get("/:id", getSkillById);
router.get("/getCategories", getCategories);
router.get("/getNiches", getNiches);
router.get("/getExtPhase", getExtPhase);
router.get("/getPhases", getPhases);


module.exports = router;
