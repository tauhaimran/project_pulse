import React, { useState } from 'react';
import { createProject } from '../services/api';

const ProjectForm = () => {
    const [projectData, setProjectData] = useState({ title: '', description: '', dueBy: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(projectData);
            alert("Project Created Successfully!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
            <input type="date" name="dueBy" onChange={handleChange} required />
            <button type="submit">Create Project</button>
        </form>
    );
};

export default ProjectForm;
