const mongoose = require('mongoose');

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
      default: 'No bio yet',
    },
    age: {
      type: Number,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
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
