import { Team } from '../models/Team.js';

// Create a new Team
export const createTeam = async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing Team
export const updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
