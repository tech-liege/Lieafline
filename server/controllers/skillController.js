const Skill = require('../model/Skill');
const skillData = {
  allCategories: { 0: "IT", 1: "AI" },
  allNiches: {
    IT: { 0: "CyberSecurities", 1: "Web Development", 2: "Software Development" },
    AI: { 0: "Prompt Engineering", 1: "AI Jail Breaking" },
  },
};

// ✅ Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const { title, description, tags, category, niche, phases } = req.body;

    const skill = new Skill({
      title,
      description,
      tags,
      category,
      niche,
      phases,
      createdBy: req.user._id, // from auth middleware
    });

    const savedSkill = await skill.save();
    res.status(201).json({ skill: savedSkill, message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create skill", error: error.message });
  }
};

// ✅ Get all skills for the logged-in user
exports.getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user skills", error: error.message });
  }
};

// ✅ Get skills by a specific user (public)
exports.getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params;
    const skills = await Skill.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch that user's skills", error: error.message });
  }
};

// Get Categories
exports.getCategories = async (req, res) => {
  try {
    res.status(201).json({ categories: skillData.allCategories });
  } catch (err) {
    res.status(500).json({ message: "Failed to load" });
  }
};

// Get Niches
exports.getNiches = async (req, res) => {
  try {
    const { category } = req.body;
    res.status(201).json({ niches: skillData.allNiches[category] });
  } catch (err) {
    res.status(500).json({ message: "Failed to load" });
  }
};

// ✅ Get a specific skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(201).json({ skill: skill, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skill', error: error.message });
  }
};

// ✅ Delete a skill (only by creator)
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skill.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this skill' });
    }

    await skill.deleteOne();
    res.status(200).json({ message: 'Skill deleted successfully', skill: skill });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill', error: error.message });
  }
};
// Utility: safely compute an average
const calculateAverage = (arr, key = "progress") => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const sum = arr.reduce((acc, item) => acc + (item[key] || 0), 0);
  return Math.round(sum / arr.length);
};

exports.updateSkill = async (req, res) => {
  const { id } = req.params;

  try {
    // Find skill
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Ensure the user owns this skill
    if (skill.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this skill" });
    }

    // Apply updates (merge incoming fields)
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // Recalculate progress for all nested structures
    updatedSkill.phases.forEach((phase) => {
      phase.modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
          // Lesson progress = % of completed tasks
          if (Array.isArray(lesson.tasks) && lesson.tasks.length > 0) {
            const completedCount = lesson.tasks.filter((t) => t.completed).length;
            lesson.progress = Math.round((completedCount / lesson.tasks.length) * 100);
          } else {
            lesson.progress = 0;
          }
        });

        // Module progress = average of its lessons
        module.progress = calculateAverage(module.lessons);
      });

      // Phase progress = average of its modules
      phase.progress = calculateAverage(phase.modules);
    });

    // Skill progress = average of phases
    updatedSkill.progress = calculateAverage(updatedSkill.phases);

    // Save updated structure
    const savedSkill = await updatedSkill.save();

    return res.status(200).json({
      message: "Skill updated successfully",
      skill: savedSkill,
    });
  } catch (error) {
    console.error("Update Skill Error:", error.message);
    res.status(500).json({
      message: "Failed to update skill",
      error: error.message,
    });
  }
};

