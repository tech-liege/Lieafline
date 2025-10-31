const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 300,
      default: 'No description yet',
    },
    resources: {
      type: Array,
    },
    note: {
      type: String,
      default: 'Note',
    },
    completed: {
      type: Boolean,
      default: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
  },
  { timestamps: true }
);

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 300,
      default: 'No description yet',
    },
    progress: {
      type: Number,
      default: 0,
    },
    phase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phase',
      required: true,
    },
  },
  { timestamps: true }
);

const phaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: 'No description yet',
    },
    progress: {
      type: Number,
      default: 0,
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
  },
  { timestamps: true }
);

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 1000,
      default: 'No description yet',
    },
    tags: {
      type: Array,
      default: ['Tags'],
    },
    progress: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
const Phase = mongoose.model('Phase', phaseSchema);
const Section = mongoose.model('Section', sectionSchema);
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = {Skill, Phase, Section, Lesson};
