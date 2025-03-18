import React, { useState } from 'react';
import { createTeam } from '../services/api';

const TeamForm = ({ projectID }) => {
    const [teamData, setTeamData] = useState({ 
        projectID, 
        teamLead: '', 
        members: [] 
    });

    const handleChange = (e) => {
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTeam(teamData);
            alert("Team Created Successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="teamLead" placeholder="Team Lead" onChange={handleChange} required />
            <textarea name="members" placeholder="Enter Members (Comma Separated)" onChange={handleChange}></textarea>
            <button type="submit">Create Team</button>
        </form>
    );
};

export default TeamForm;
