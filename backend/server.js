const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware'); // Import auth middleware
const Task = require('./models/taskModel');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
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
}).catch(err => console.error(`MongoDB connection error: ${err.message}`));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', protect, taskRoutes); // Protect task routes with middleware

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
