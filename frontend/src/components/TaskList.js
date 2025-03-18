import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../services/api';

const TaskList = ({ projectID }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const { data } = await fetchTasks(projectID);
                setTasks(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (projectID) {
            getTasks();
        }
    }, [projectID]);

    return (
        <div>
            <h2>Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks found for this project.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            {task.taskName} - {task.status} - {new Date(task.deadline).toDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
