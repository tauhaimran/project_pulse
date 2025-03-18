const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const taskRoutes = require('./routes/taskRoutes');
const Task = require('./models/taskModel'); // Import the Task model

app.use('/api/tasks', taskRoutes);
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('MongoDB connected');

  // Seed sample data (only if collection is empty)
  const existingTasks = await Task.countDocuments();
  if (existingTasks === 0) {
    const seedTasks = [
      {
        title: 'Set up project',
        description: 'Initialize the project and set up the folder structure',
        status: 'Pending'
      },
      {
        title: 'Create backend API',
        description: 'Develop the REST API for managing tasks',
        status: 'In Progress'
      },
      {
        title: 'Design frontend UI',
        description: 'Create the frontend using React and style it',
        status: 'Completed'
      }
    ];

    await Task.insertMany(seedTasks);
    console.log('Sample tasks added to database');
  }
}).catch(err => console.error(err));

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import userRoutes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Import projectRoutes, taskRoutes, and commentRoutes
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Use the routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);

// Import the authRoutes
const dotenv = require('dotenv');
dotenv.config();

// Import the userRoutes
const authRoutes = require('./routes/userRoutes');
app.use('/api/auth', authRoutes);

// Import the projectRoutes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);


// Import the commentRoutes
const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);
