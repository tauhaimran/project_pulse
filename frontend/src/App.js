import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ManageTeams from './components/ManageTeams';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role || '');
      
      // Fetch user data to confirm role
      axios
        .get('/api/auth/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUserRole(response.data.role);
          localStorage.setItem('role', response.data.role);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          // If token is invalid, logout
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        })
        .finally(() => {
          setLoading(false);
        });
        
      // Fetch tasks
      axios
        .get('/api/tasks', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          console.log('Fetched tasks:', response.data);
          setTasks(response.data);
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserRole(localStorage.getItem('role') || '');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole('');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Task Management App</h1>
          {isAuthenticated && (
            <div style={{ marginTop: '10px' }}>
              <nav style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '20px',
                marginBottom: '15px'
              }}>
                <Link to="/tasks" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px'
                }}>
                  Tasks
                </Link>
                
                {userRole === 'Manager' && (
                  <Link to="/manage-teams" style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '4px'
                  }}>
                    Manage Teams
                  </Link>
                )}
              </nav>
              <button 
                onClick={handleLogout}
                style={{ 
                  maxWidth: '120px', 
                  backgroundColor: '#f44336',
                  marginTop: '5px'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </header>
        
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/tasks" element={isAuthenticated ? <TaskList tasks={tasks} /> : <Navigate to="/login" />} />
          <Route 
            path="/manage-teams" 
            element={
              isAuthenticated && userRole === 'Manager' 
                ? <ManageTeams /> 
                : <Navigate to={isAuthenticated ? "/tasks" : "/login"} />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;