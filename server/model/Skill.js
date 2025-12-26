const mongoose = require('mongoose');

const q_aSchema = new mongoose.Schema({
  nature: { type: String, required: true }, // default=multichoice/bool/etc..
  question: { type: String, required: true },
  options: { a: { type: String, required: true }, b: { type: String, required: true }, c: String, d: String },
  answer: {
    type: String,
    maxlength: 1,
    required: true,
    // either 'a', 'b', 'c' or 'd'
  },
});

const todoSchema = new mongoose.Schema({
  ofType: String, // read/video/question
  notes: String,
  videos: String,
  q_a: [q_aSchema],
});

const taskSchema = new mongoose.Schema(
  {
    xp: Number,
    todos: [todoSchema],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const lessonSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: {
      type: String,
      maxlength: 300,
    },
    resources: [String], // links, PDFs, videos, etc.
    tasks: [taskSchema],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    note: {
      type: String,
      maxlength: 30000,
    },
    progress: { type: Number, default: 0 },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

const phaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      maxlength: 300,
    },
    progress: { type: Number, default: 0 },
    modules: [moduleSchema],
  },
  { timestamps: true }
);

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
    progress: { type: Number, default: 0 },
    phases: [phaseSchema],
    private: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
