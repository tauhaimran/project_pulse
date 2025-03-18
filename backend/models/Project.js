const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    managerID: { type: String, required: true },
    projectID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    dueBy: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
