const mongoose = require('mongoose');
const getIdSchema = require("../utils/getIdSchema");

const skillId = getIdSchema("Skill");
const progressId = getIdSchema("Progress");

const streakSchema = new mongoose.Schema(
  {
    value: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const xpSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 300,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    profilePic: {
      type: String,
    },
    skills: [skillId],
    progress: [progressId],
    bookmarks: [skillId],
    archives: [skillId],
    xp: [xpSchema],
    streaks: [streakSchema],
    streakFreezes: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    highestStreak: { type: Number, default: 0 },
    settings: {
      appearance: {
        darkmode: {
          type: Boolean,
          default: false,
        },
      },
      profile: {
        emailVis: {
          type: Boolean,
          default: true,
        },
        ageVis: {
          type: Boolean,
          default: true,
        },
        activityVis: {
          type: Boolean,
          default: false,
        },
        reminders: {
          type: Boolean,
          default: false,
        },
      },
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
