const Task = require('../models/Task');

// Create a Task
exports.createTask = async (req, res) => {
    try {
        const { projectID, mainAssignee, taskID, taskName, sprintNumber, Deadline } = req.body;

        const newTask = new Task({
            projectID,
            mainAssignee,
            taskID,
            taskName,
            sprintNumber,
            Deadline,
            Status: "Pending",
            Documents: [],
            comments: []
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Task
exports.updateTask = async (req, res) => {
    try {
        const { taskID } = req.params;
        const { taskName, Status, sprintNumber, Deadline } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { taskID },
            { taskName, Status, sprintNumber, Deadline },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View All Tasks for a Project
exports.viewTasks = async (req, res) => {
    try {
        const { projectID } = req.params;

        const tasks = await Task.find({ projectID });
        if (!tasks) return res.status(404).json({ message: 'No tasks found for this project' });

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
