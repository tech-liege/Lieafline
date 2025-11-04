const jwt = require('jsonwebtoken');
const User = require('../model/User');
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const authM = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized user' });
    }
  } catch {
    res.status(401).json({ message: 'Unauthorized User' });
  }
};

module.exports = authM;
