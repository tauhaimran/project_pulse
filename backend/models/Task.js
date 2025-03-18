const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectID: { type: String, required: true },
    mainAssignee: { type: String, required: true },
    taskID: { type: String, required: true, unique: true },
    taskName: { type: String, required: true },
    status: { type: String, default: "Pending" },
    sprintNumber: { type: String },
    documents: [{ type: String }],
    comments: [{ type: String }],
    deadline: { type: Date, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
