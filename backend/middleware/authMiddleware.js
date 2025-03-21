const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import User model

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

// Middleware to check if the user is a Manager
const managerOnly = async (req, res, next) => {
  if (req.user.role !== 'Manager') {
    return res.status(403).json({ message: 'Access denied. Managers only' });
  }
  next();
};

module.exports = { protect, managerOnly };
