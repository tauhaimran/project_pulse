import React, { useState, useEffect } from 'react';
import { fetchTeams } from '../services/api';

const TeamList = ({ projectID }) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const getTeams = async () => {
            try {
                const { data } = await fetchTeams(projectID);
                setTeams(data);
            } catch (error) {
                console.error(error);
            }
        };
        getTeams();
    }, [projectID]);

    return (
        <div>
            <h2>Teams</h2>
            <ul>
                {teams.map((team) => (
                    <li key={team._id}>
                        Team Lead: {team.teamLead} | Members: {team.members.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamList;
