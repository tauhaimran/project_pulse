const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register user
router.post('/register', async (req, res) => {
    console.log('Request body:', req.body); // Debug log
  
    const { username, email, password, role } = req.body;
  
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = new User({
        username,
        email,
        password, // Let the schema handle hashing
        role
      });
      
  
      await user.save();
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      });
    } catch (err) {
      console.error(err);
      
      // Return detailed Mongoose validation errors
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: Object.values(err.errors).map(error => error.message).join(', ') });
      }

      res.status(500).json({ message: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Login Attempt:');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials (user not found)' });
        }

        console.log('Stored Password:', user.password);
        console.log('Provided Password:', password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match Result:', isMatch);

        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials (password mismatch)' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);

        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: err.message });
    }
});

  

module.exports = router;
