const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  index: Number,
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
});

module.exports = mongoose.model("Lesson", lessonSchema);
