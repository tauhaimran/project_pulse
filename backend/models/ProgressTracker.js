const mongoose = require('mongoose');

const progressTrackerSchema = new mongoose.Schema({
    progressID: { type: String, required: true, unique: true },
    projectID: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressTracker', progressTrackerSchema);
