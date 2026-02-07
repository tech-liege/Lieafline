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
  getDomains,
  getNiches,
  getExtPhase,
  getPhases,
  getTask,
} = require("../controllers/skillController");

const router = express.Router();

router.post("/create", authM, createSkill);
router.get("/user", authM, getMySkills);
router.delete("/:id", authM, deleteSkill);
router.patch("/:id", authM, updateSkill);
router.get("/user/:userId", authM, getUserSkills);
router.get("/:id", authM, getSkillById);
router.get("/getDomains", authM, getDomains);
router.get("/getNiches", authM, getNiches);
router.get("/getExtPhase/:id", authM, getExtPhase);
router.get("/getPhases/:id", authM, getPhases);
router.get("/getTask/:id", authM, getTask);

module.exports = router;
