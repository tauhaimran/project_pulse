const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel');
const { protect, managerOnly } = require('../middleware/authMiddleware'); // Import both middlewares

// Create a team (Managers only)
router.post('/create', protect, managerOnly, async (req, res) => {
    const { name, members } = req.body;

    try {
        const newTeam = await Team.create({
            name,
            members,
            manager: req.user._id
        });

        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create team', error });
    }
});

// Get all teams (Managers only)
router.get('/', protect, managerOnly, async (req, res) => {
    try {
        const teams = await Team.find({ manager: req.user._id }).populate('members');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});

// Update a team (Managers only)
router.put('/:id', protect, managerOnly, async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeam);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update team', error });
    }
});

// Delete a team (Managers only)
router.delete('/:id', protect, managerOnly, async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete team', error });
    }
});

module.exports = router;
