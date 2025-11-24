const Skill = require('../model/Skill');

// ✅ Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const { title, description, tags, phases } = req.body;

    const skill = new Skill({
      title,
      description,
      tags,
      phases,
      createdBy: req.user._id, // from auth middleware
    });

    const savedSkill = await skill.save();
    res.status(201).json({ skill: savedSkill, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create skill', error: error.message });
  }
};

// ✅ Get all skills for the logged-in user
exports.getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user skills', error: error.message });
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

// Utility function to compute averages safely
const calculateAverage = (arr, key = 'progress') => {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((acc, item) => acc + (item[key] || 0), 0);
  return Math.round(sum / arr.length);
};

// @desc    Update a skill (e.g. progress, title, phases, etc.)
// @route   PATCH /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res) => {
  const { id } = req.params;

  // Check if skill exists and belongs to user
  const skill = await Skill.findById(id);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }

  if (skill.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this skill');
  }

  // Apply updates (merge existing + new)
  const updatedSkill = await Skill.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });

  // Recalculate nested progress values
  updatedSkill.phases.forEach(phase => {
    phase.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        // Each lesson's progress = average of completed tasks
        if (lesson.tasks && lesson.tasks.length > 0) {
          const completedCount = lesson.tasks.filter(l => l.completed).length;
          lesson.progress = Math.round((completedCount / lessons.tasks.length) * 100);
        }
      });
      module.progress = calculateAverage(module.lessons);
    });

    // Each phase's progress = average of its modules
    phase.progress = calculateAverage(phase.modules);
  });

  // Skill progress = average of its phases
  updatedSkill.progress = calculateAverage(updatedSkill.phases);

  const savedSkill = await updatedSkill.save();

  res.json(savedSkill);
};
