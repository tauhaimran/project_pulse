const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
});

// Check if the model already exists to avoid OverwriteModelError
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;
