import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProjects = () => API.get('/projects');
export const createProject = (newProject) => API.post('/projects', newProject);

// Tasks API
export const fetchTasks = (projectID) => API.get(`/tasks/${projectID}`);
export const createTask = (taskData) => API.post('/tasks', taskData);

// Teams API
export const fetchTeams = (projectID) => API.get(`/teams/${projectID}`);
export const createTeam = (teamData) => API.post('/teams', teamData);

// Task Assignment API
export const assignTask = (taskID, userID) => API.post(`/tasks/assign`, { taskID, userID });
