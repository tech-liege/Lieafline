const mongoose = require("mongoose");
const getIdSchema = require("../utils/getIdSchema");

const skillId = getIdSchema('Skill');

const pathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  category: { type: String, required: true },
  niche: { type: String, required: true },
  private: { type: Boolean, default: true },
  skills: [skillId],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Path", pathSchema);
