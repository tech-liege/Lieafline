const mongoose = require('mongoose');


const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      maxlength: 300,
    },
    tags: [String],
    category: { type: String, required: true },
    niche: { type: String, required: true },
    private: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }
);

module.exports = mongoose.model('Skill', skillSchema);
