const mongoose = require("mongoose");

const phaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    maxlength: 300,
  },
  index: Number,
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
});
module.exports = mongoose.model("Phase", phaseSchema);
