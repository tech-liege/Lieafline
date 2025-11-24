const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    todo: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    notes: String, // user's learning notes
    resources: [String], // links, PDFs, videos, etc.
    tasks: [taskSchema],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    progress: { type: Number, default: 0 },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

const phaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    progress: { type: Number, default: 0 },
    modules: [moduleSchema],
  },
  { timestamps: true }
);

const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tags: [String],
    progress: { type: Number, default: 0 },
    phases: [phaseSchema],
    private: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
