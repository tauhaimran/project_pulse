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
            <ProjectForm />
            <ProjectList onClick={handleProjectClick} />

            {selectedProjectID && (
                <>
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
