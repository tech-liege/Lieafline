const Skill = require("../model/Skill/Skill");
const Phase = require("../model/Skill/Phase");
const Module = require("../model/Skill/Module");
const Lesson = require("../model/Skill/Lesson");
const Task = require("../model/Skill/Task");
const ToDo = require("../model/Skill/ToDo");
const User = require("../model/User");
const Taxonomy = require("../utils/taxonomy.json");

// ✅ Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const { title, description, tags, domainInd, phases } = req.body;

    if (Taxonomy.domains[domainInd] === undefined) {
      return res.status(400).json({ message: "Invalid domainInd" });
    }

    const skill = new Skill({
      title,
      description,
      tags,
      domainInd,
      createdBy: req.user.id, // from auth middleware
    });
    const savedSkill = await skill.save();

    phases.map(async (phase, index) => {
      var ph = new Phase({
        title: phase.title,
        description: phase.description,
        index: index,
        skillId: savedSkill.id,
      });
      var savedPh = await ph.save();

      phase.modules.map(async (modu, index) => {
        var mod = new Module({
          title: modu.title,
          note: modu.note,
          index: index,
          phaseId: savedPh.id,
        });
        var savedMod = await mod.save();

        modu.lessons.map(async (less, index) => {
          var les = new Lesson({
            index: index,
            moduleId: savedMod.id,
          });
          var savedLes = await les.save();

          less.tasks.map(async (task, index) => {
            var tsk = new Task({
              xp: task.xp,
              index: index,
              lessonId: savedLes.id,
            });
            var savedTsk = await tsk.save();

            task.todos.map(async (todo, index) => {
              var td = new Todo({
                format: todo.format,
                note: todo.note,
                q_a: todo.q_a,
                index: index,
                taskId: savedTsk.id,
              });
              var savedTd = await td.save();
            });
          });
        });
      });
    });

    res.status(201).json({ skill: savedSkill, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create skill", error: error.message });
  }
};

// ✅ Get all skills for the logged-in user
exports.getMySkills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const skills = [];

    await user.skills.map(async (uSkill) => {
      var skill = await Skill.findById(uSkill.objId);
      skills.push(skill);
    });

    res.status(200).json({
      message: "All My Skill",
      skills: skills.sort({ createdAt: -1 }),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user skills", error: error.message });
  }
};

// ✅ Get skills by a specific user (public)
exports.getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const skills = [];

    await user.skills.map(async (uSkill) => {
      var skill = await Skill.findById(uSkill.objId);
      skills.push(skill);
    });

    res.status(200).json({
      message: "All Skills",
      skills: skills.sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch that user's skills",
      error: error.message,
    });
  }
};

// Get Domains
exports.getDomains = async (req, res) => {
  try {
    res.status(201).json({ domains: Taxonomy.domains, message: "Domains" });
  } catch (err) {
    res.status(500).json({ message: "Failed to load" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).select("-lessonId");
    if (!task) return res.status(404).json({ message: "Task not found" });

    const todos = await ToDo.find({ taskId: task.id });
    if (!todos) {
      return res.status(404).json({ message: "Todos not found" });
    }

    task.todos = todos;

    const tasks = await Task.find({ lessonId: task.lessonId });

    res.status(201).json({
      task: task,
      l: tasks?.length,
      message: "Single Task",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPhases = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    const phases = await Phase.find({ skillId: skill.id });
    if (!phases) {
      return res.status(404).json({ message: "Phases not found" });
    }
    res.status(201).json({
      skill: { title: skill.title, phases: phases },
      message: "Phases",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExtPhase = async (req, res) => {
  try {
    const phase = await Phase.findById(req.params.id);
    if (!phase) {
      return res.status(404).json({ message: "Phase not found" });
    }
    var finalPhase = phase;
    const modules = await Module.find({ phaseId: phase.id });
    if (modules) {
      finalPhase.modules = modules;
      modules.map(async (module, mInd) => {
        var lessons = await Lesson.find({ moduleId: module.id });
        if (lessons) {
          finalPhase.modules[mInd].lessons = lessons;
          lessons.map(async (lesson, lInd) => {
            var tasks = await Task.find({ lessonId: lesson.id });
            if (tasks) {
              finalPhase.modules[mInd].lessons[lInd].tasks = tasks;
            }
          });
        }
      });
    }

    res.status(201).json({ phase: finalPhase, message: "ExtPhase" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get a specific skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(201).json({ skill: skill, message: "Single Skill" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch skill", error: error.message });
  }
};

// ✅ Delete a skill (only by creator)
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this skill" });
    }

    await skill.deleteOne();
    res
      .status(200)
      .json({ message: "Skill deleted successfully", skill: skill });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete skill", error: error.message });
  }
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
    if (skill.createdBy.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this skill" });
    }

    // Apply updates (merge incoming fields)
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

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
