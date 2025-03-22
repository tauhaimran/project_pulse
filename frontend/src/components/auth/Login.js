import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) { // Accept onLogin prop
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('/api/auth/login', formData);
      console.log('Login successful:', response.data);

      // Save token and user role to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store user role

      // Call onLogin to update authentication state
      onLogin(); 
      
      // Redirect to tasks page after login
      navigate('/tasks');
    } catch (error) {
      console.error('Login failed:', error.response?.data);
      setError(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
