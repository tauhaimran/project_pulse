import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    managerID: String,
    projectID: String,
    title: String,
    description: String,
    dueBy: Date
});

export const Project = mongoose.model('Project', projectSchema);
