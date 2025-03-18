import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';

const ProjectList = ({ onProjectClick }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const { data } = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error(error);
            }
        };
        getProjects();
    }, []);

    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project._id} onClick={() => onProjectClick(project._id)}>
                        {project.name} - {project.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
