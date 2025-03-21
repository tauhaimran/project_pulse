import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
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
      const response = await axios.post('/api/auth/register', formData);
      console.log('Registration successful:', response.data);

      alert('Registration successful! You can now log in.');
      
      // Redirect to login after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data);
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
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
        
        {/* ✅ Dropdown for role selection */}
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          required
        >
            <option value="" disabled>Select Role</option>
            <option value="Team Member">Team Member</option>
            <option value="Executive">Executive</option>
            <option value="Manager">Manager</option>
        </select>
        
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <span 
          onClick={() => navigate('/login')} 
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
