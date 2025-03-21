import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log('Fetched tasks:', response.data);
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setIsAuthenticated(false);
      });
    }
  }, []);

  // Update authentication state after login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Task Management App</h1>
          {isAuthenticated && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </header>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass onLogin here */}
          <Route 
            path="/tasks" 
            element={isAuthenticated ? <TaskList tasks={tasks} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
