import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageTeams() {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [members, setMembers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [editingTeam, setEditingTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch teams and available users
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Fetch teams
        axios.get('/api/teams', { 
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setTeams(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching teams:', error);
            setError('Failed to load teams. Please try again later.');
            setLoading(false);
        });
        
        // Fetch available users to add as team members
        axios.get('/api/auth/users', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setAvailableUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, []);

    const handleCreateTeam = () => {
        if (!teamName.trim()) {
            setError('Team name cannot be empty');
            return;
        }

        const token = localStorage.getItem('token');
        axios.post('/api/teams/create', { 
            name: teamName,
            members: selectedMembers 
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setTeams([...teams, response.data]);
            setTeamName('');
            setSelectedMembers([]);
            setError('');
        })
        .catch(error => {
            console.error('Error creating team:', error);
            setError('Failed to create team. Please try again.');
        });
    };

    const handleUpdateTeam = () => {
        if (!teamName.trim()) {
            setError('Team name cannot be empty');
            return;
        }

        const token = localStorage.getItem('token');
        axios.put(`/api/teams/${editingTeam._id}`, { 
            name: teamName,
            members: selectedMembers 
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setTeams(teams.map(team => 
                team._id === editingTeam._id ? response.data : team
            ));
            setTeamName('');
            setSelectedMembers([]);
            setEditingTeam(null);
            setError('');
        })
        .catch(error => {
            console.error('Error updating team:', error);
            setError('Failed to update team. Please try again.');
        });
    };

    const handleDeleteTeam = (id) => {
        if (window.confirm('Are you sure you want to delete this team?')) {
            const token = localStorage.getItem('token');
            axios.delete(`/api/teams/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                setTeams(teams.filter(team => team._id !== id));
                // If we're currently editing this team, reset the form
                if (editingTeam && editingTeam._id === id) {
                    setEditingTeam(null);
                    setTeamName('');
                    setSelectedMembers([]);
                }
            })
            .catch(error => {
                console.error('Error deleting team:', error);
                setError('Failed to delete team. Please try again.');
            });
        }
    };

    const handleEditTeam = (team) => {
        setEditingTeam(team);
        setTeamName(team.name);
        setSelectedMembers(team.members.map(member => 
            typeof member === 'object' ? member._id : member
        ));
    };

    const handleCancelEdit = () => {
        setEditingTeam(null);
        setTeamName('');
        setSelectedMembers([]);
        setError('');
    };

    const handleMemberSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedMembers(selectedOptions);
    };

    if (loading) {
        return <div className="center-content">Loading teams...</div>;
    }

    return (
        <div className="form-container">
            <h2>{editingTeam ? 'Update Team' : 'Create Team'}</h2>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <input 
                type="text" 
                value={teamName} 
                onChange={(e) => setTeamName(e.target.value)} 
                placeholder="Enter team name" 
            />
            
            <select 
                multiple 
                value={selectedMembers} 
                onChange={handleMemberSelection}
                style={{ height: '100px' }}
            >
                {availableUsers.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.username} ({user.email})
                    </option>
                ))}
            </select>
            <p style={{ fontSize: '12px', textAlign: 'left', marginTop: '-10px', marginBottom: '10px' }}>
                Hold Ctrl/Cmd to select multiple members
            </p>
            
            {editingTeam ? (
                <div>
                    <button onClick={handleUpdateTeam}>Update Team</button>
                    <button 
                        onClick={handleCancelEdit}
                        style={{ backgroundColor: '#f0ad4e', marginTop: '10px' }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button onClick={handleCreateTeam}>Create Team</button>
            )}
            
            <h3 style={{ marginTop: '30px' }}>Your Teams</h3>
            
            {teams.length === 0 ? (
                <p>No teams found. Create a team to get started.</p>
            ) : (
                <ul className="task-list">
                    {teams.map(team => (
                        <li key={team._id}>
                            <div>
                                <strong>{team.name}</strong>
                                <p>Members: {team.members.length}</p>
                            </div>
                            <div>
                                <button 
                                    onClick={() => handleEditTeam(team)}
                                    style={{ 
                                        backgroundColor: '#2196F3', 
                                        width: 'auto', 
                                        padding: '8px 12px',
                                        marginRight: '5px'
                                    }}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteTeam(team._id)}
                                    style={{ 
                                        backgroundColor: '#f44336', 
                                        width: 'auto', 
                                        padding: '8px 12px' 
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ManageTeams;