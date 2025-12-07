const mongoose = require('mongoose');

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
      default: "No bio yet",
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    streaks: [streakSchema],
    // streakFreezes:{type:Number,default=0},
    currentStreak: { type: Number, default: 0 },
    highestStreak: { type: Number, default: 0 },
    xp: [xpSchema],
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
