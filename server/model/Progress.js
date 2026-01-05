const mongoose = require("mongoose");
const getIdSchema = require("../utils/getIdSchema");

const phaseId = getIdSchema("Phase");
const moduleId = getIdSchema("Module");
const lessonId = getIdSchema("Lesson");
const taskId = getIdSchema("Task");

const progressSchema = new mongoose.Schema(
  {
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
    percent: { type: Number, default: 0 },
    currentPhaseId: { type: mongoose.Schema.Types.ObjectId, ref: "Phase" },
    currentModuleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    currentLessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    currentTaskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    completedPhases: [phaseId],
    completeModules: [moduleId],
    completedLessons: [lessonId],
    completedTasks: [taskId],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
