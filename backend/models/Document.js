const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    taskID: { type: String, required: true },
    documentID: { type: String, required: true, unique: true },
    fileName: { type: String, required: true }
});

module.exports = mongoose.model('Document', documentSchema);
