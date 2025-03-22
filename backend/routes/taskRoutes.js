const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    status: req.body.status
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
