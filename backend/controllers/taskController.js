import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
    const taskData = req.body;

    try {
        const task = new Task(taskData);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Get tasks by ProjectID
export const getTasksByProjectID = async (req, res) => {
    const { projectID } = req.params;

    try {
        const tasks = await Task.find({ projectID });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
