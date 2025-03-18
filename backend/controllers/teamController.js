import Team from '../models/Team.js';

// Create a new team
export const createTeam = async (req, res) => {
    const teamData = req.body;

    try {
        const team = new Team(teamData);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Get teams by ProjectID
export const getTeamsByProjectID = async (req, res) => {
    const { projectID } = req.params;

    try {
        const teams = await Team.find({ projectID });
        res.status(200).json(teams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
