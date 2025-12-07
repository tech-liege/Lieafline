const mongoose = require('mongoose');

const q_aSchema = new mongoose.Schema(
  {
    nature: { type: String, required: true },
    question: { type: String, required: true },
    options: [String],
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    nature: { type: String, required: true },
    notes: String, // user's learning notes
    videos: String,
    q_a: [q_aSchema],
    xpScore: Number,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
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
    category: { type: String, required: true },
    niche: { type: String, required: true },
    progress: { type: Number, default: 0 },
    phases: [phaseSchema],
    private: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
