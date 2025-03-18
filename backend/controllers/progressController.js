import { Progress } from '../models/ProgressTracker.js';

// Generate Gantt Chart (Just returning a message for now)
export const generateGanttChart = async (req, res) => {
    try {
        const { projectId } = req.params;
        res.json({ message: `Gantt Chart for Project ID: ${projectId}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Generate Burn Down Chart (Just returning a message for now)
export const generateBurnDownChart = async (req, res) => {
    try {
        const { projectId } = req.params;
        res.json({ message: `Burn Down Chart for Project ID: ${projectId}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
