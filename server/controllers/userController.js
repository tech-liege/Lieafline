const User = require('../model/User');

// GET /user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

// PATCH /user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true }).select('-password');

    res.json(user);
  } catch (err) {
    res.status(400).json({
      message: 'Update failed',
      error: err.message,
    });
  }
};

// GET /settings
exports.getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('settings');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.settings || {});
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

// PATCH /settings
exports.updateUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.settings = {
      ...user.settings,
      ...req.body,
    };

    await user.save();

    res.json(user.settings);
  } catch (err) {
    res.status(400).json({
      message: 'Settings update failed',
      error: err.message,
    });
  }
};
