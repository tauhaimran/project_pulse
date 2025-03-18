import React, { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';

const HomePage = () => {
    const [selectedProjectID, setSelectedProjectID] = useState(null);

    const handleProjectClick = (projectID) => {
        setSelectedProjectID(projectID);
    };

    return (
        <div>
            <h1>Task Management App</h1>
            <ProjectForm />
            <ProjectList onProjectClick={handleProjectClick} />

            {selectedProjectID && (
                <>
                    <h2>Selected Project ID: {selectedProjectID}</h2>
                    <TaskForm projectID={selectedProjectID} />
                    <TaskList projectID={selectedProjectID} />
                    <TeamForm projectID={selectedProjectID} />
                    <TeamList projectID={selectedProjectID} />
                </>
            )}
        </div>
    );
};

export default HomePage;
