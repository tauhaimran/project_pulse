const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { taskID } = req.params;
        const updatedTask = await Task.findOneAndUpdate({ taskID }, req.body, { new: true });
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Compare this snippet from backend/models/Task.js: