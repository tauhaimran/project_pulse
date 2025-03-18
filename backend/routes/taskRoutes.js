const express = require('express');
const router = express.Router();
const { createTask, updateTask, viewTasks } = require('../controllers/taskController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

// Creating a Task (Only accessible by Managers & Team Leads)
router.post('/create', verifyToken, requireRole(['Manager', 'TeamLead']), createTask);

// Updating a Task
router.put('/update/:taskID', verifyToken, requireRole(['Manager', 'TeamLead']), updateTask);

// Viewing Tasks by Project ID
router.get('/view/:projectID', verifyToken, viewTasks);

module.exports = router;

// Path: backend/controllers/taskController.js
// Compare this snippet from backend/models/Task.js:
// const Task = require('../models/Task');