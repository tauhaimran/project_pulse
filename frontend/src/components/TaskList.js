import React from 'react';

function TaskList({ tasks }) {
  return (
    <div>
      <h2 className="header">Tasks</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <span className={`status ${task.status.replace(' ', '-').toLowerCase()}`}>
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
