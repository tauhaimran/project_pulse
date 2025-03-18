const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectID: { type: String, required: true },
    mainAssignee: { type: String, required: true },
    taskID: { type: String, required: true, unique: true },
    taskName: { type: String, required: true },
    Status: { type: String, default: "Pending" },
    sprintNumber: { type: String },
    Documents: [{ type: String }],
    comments: [{ type: String }],
    Deadline: { type: Date, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
