const mongoose = require('mongoose');

const executiveSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    projectID: { type: String, required: true }
});

module.exports = mongoose.model('Executive', executiveSchema);
