const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  xp: Number,
  index: Number,
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
});

module.exports = mongoose.model("Task", taskSchema);
