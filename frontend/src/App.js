import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the styles
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        console.log('Fetched tasks:', response.data); // Debugging log
        setTasks(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);
  

  return (
    <div className="App">
      <header className="header">
        <h1>Task Management App</h1>
      </header>
      <main>
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}

export default App;
