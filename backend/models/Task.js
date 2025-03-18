import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    projectID: String,
    mainAssignee: String,
    taskID: String,
    taskName: String,
    status: String,
    sprintNumber: String,
    documents: [String],
    comments: [String],
    deadline: Date
});

export const Task = mongoose.model('Task', taskSchema);
