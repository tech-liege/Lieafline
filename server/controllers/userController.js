const User = require('../model/User');

// GET /user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.streaks[-1].createdAt + 1000 * 60 * 60 * 24 * 2 < Date.now()) {
      user.currentStreak = 0;
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// PATCH /user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true }).select(
      "-password"
    );

    res.json(user);
  } catch (err) {
    res.status(400).json({
      message: "Update failed",
      error: err.message,
    });
  }
};

// GET /settings
exports.getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("settings");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.settings || {});
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// PATCH /settings
exports.updateUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.settings = {
      ...user.settings,
      ...req.body,
    };

    await user.save();

    res.json(user.settings);
  } catch (err) {
    res.status(400).json({
      message: "Settings update failed",
      error: err.message,
    });
  }
};

exports.increaseStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.streaks[-1].createdAt + 1000 * 60 * 60 * 24 < Date.now()) {
      if (user.streaks[-1].createdAt + 1000 * 60 * 60 * 24 * 2 > Date.now()) {
        user.streaks = [...user.streaks, {}];
        user.currentStreak += 1;
        user.currentStreak > user.highestStreak && (user.highestStreak = user.currentStreak);
        await user.save();
      } else {
        user.currentStreak = 0;
        await user.save();
      }

      res.status(201).json({ message: "success", streak: streak.days });
    } else {
      res.status(200).json({ message: "streak already updated today", streak: streak.days });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
};