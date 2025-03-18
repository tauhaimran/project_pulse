import React, { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = ({ projectID }) => {
    const [taskData, setTaskData] = useState({ 
        projectID, 
        taskName: '', 
        status: 'Not Started', 
        deadline: '' 
    });

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask(taskData);
            alert("Task Created Successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="taskName" placeholder="Task Name" onChange={handleChange} required />
            <select name="status" onChange={handleChange}>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <input type="date" name="deadline" onChange={handleChange} required />
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;
