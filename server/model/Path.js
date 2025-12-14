const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  category: { type: String, required: true },
  niche: { type: String, required: true },
  private: { type: Boolean, default: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Path", pathSchema);
